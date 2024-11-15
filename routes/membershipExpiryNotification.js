const express = require('express');
const router = express.Router();
const { MembershipExpiryNotification, Customer } = require('../models');

// access the notifications for the specific customer
router.get('/:customerID', async (req, res) => {
    try {
        const customerID = req.params.customerID;

        // Use customerID to get notifications
        const notifications = await MembershipExpiryNotification.findAll({
            where: { customerID: customerID },
            include: [{
                model: Customer,
                as: 'customer'
            }]
        });

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'An error occurred while fetching notifications' });
    }
});

module.exports = router;
