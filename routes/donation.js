const express = require('express');
const router = express.Router();
const {Donation} = require("../models");


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