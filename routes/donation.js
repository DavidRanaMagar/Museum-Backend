const express = require('express');
const router = express.Router();
const { Donation, sequelize} = require("../models");
const { QueryTypes } = require('sequelize');


// get all
router.get('/', async (req, res) => {
    try {
        const donation = await Donation.findAll();
        res.json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Donation'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const donation = await Donation.findByPk(id);
        res.json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Donation'});
    }
});

router.post('/dateRange', async (req, res) => {
    const {startDate, endDate} = req.body;

    try {
        const donation = await sequelize.query(
            `
            SELECT * 
            FROM Donation AS d
            WHERE d.donationDate <= :endDate AND d.donationDate >= :startDate
            `,
            {
                replacements: { startDate, endDate },
                type: QueryTypes.SELECT
            }
        );
        res.json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Donation'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const donation = await Donation.create(req.body);
        res.json(donation);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Donation'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const donation = await Donation.findByPk(id);
        if (!donation) {
            return res.status(404).json({message: 'Donation not found'});
        }
        await donation.destroy();
        // Send success response
        res.json({message: `Donation with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Donation'});
    }
});

module.exports = router;