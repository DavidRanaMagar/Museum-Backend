const express = require('express');
const router = express.Router();
const {Membership} = require("../models");


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

//get by ID
router.get('/:id ', async (req, res) => {
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

module.exports = router;