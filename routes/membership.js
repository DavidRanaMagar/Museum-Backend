const express = require('express');
const router = express.Router();
const {Membership} = require("../models");
const { Op } = require('sequelize');


// get all
router.get('/', async (req, res) => {
    try {
        const memberShip = await Membership.findAll();
        res.json(memberShip);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Membership'});
    }
});

//get by userID
router.get('/customer/:userID', async (req, res) => {
    try {
        const customerID = req.params.userID;
        const membership = await Membership.findAll({
            where: {
                customerID,
                endDate: {
                    [Op.gt]: new Date(), // Check if endDate is greater than today
                },
            },
        });

        if (membership.length > 0) {
            res.json(membership);
        } else {
            res.status(404).json({ message: 'No valid memberships found for the given userID' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching the Membership' });
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const membership = await Membership.findByPk(id);
        res.json(membership);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Membership'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const membership = await Membership.create(req.body);
        res.json(membership);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Membership'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const membership = await Membership.findByPk(id);
        if (!membership) {
            return res.status(404).json({message: 'Membership not found'});
        }
        await membership.destroy();
        // Send success response
        res.json({message: `Membership with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Membership'});
    }
});

//renew membership update
router.put('/:membershipID/renew', async (req, res) => {
    const { membershipID } = req.params;
    const { endDate, renewDate } = req.body;

    try {
        const membership = await Membership.findByPk(membershipID);

        if (!membership) {
            return res.status(404).json({ message: 'Membership not found' });
        }

        if (endDate) {
            membership.endDate = new Date(endDate); // Ensure proper date format
        }

        if (renewDate) {
            membership.renewDate = new Date(renewDate); // Ensure proper date format
        }

        await membership.save();

        res.json({ message: 'Membership updated successfully', membership });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while updating the membership' });
    }
});

module.exports = router;