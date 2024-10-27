const express = require('express');
const router = express.Router();
const {MembershipType} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const membershipType = await MembershipType.findAll();
        res.json(membershipType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching MembershipType'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const membershipType = await MembershipType.findByPk(id);
        res.json(membershipType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an MembershipType'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const membershipType = await MembershipType.create(req.body);
        res.json(membershipType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an MembershipType'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const membershipType = await MembershipType.findByPk(id);
        if (!membershipType) {
            return res.status(404).json({message: 'MembershipType not found'});
        }
        await membershipType.destroy();
        // Send success response
        res.json({message: `MembershipType with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching MembershipType'});
    }
});

module.exports = router;