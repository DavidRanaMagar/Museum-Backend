const express = require('express');
const router = express.Router();
const {Location} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const location = await Location.findAll();
        res.json(location);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Location'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const location = await Location.findByPk(id);
        res.json(location);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Location'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const location = await Location.create(req.body);
        res.json(location);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Location'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const location = await Location.findByPk(id);
        if (!location) {
            return res.status(404).json({message: 'Location not found'});
        }
        await location.destroy();
        // Send success response
        res.json({message: `Location with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Location'});
    }
});

module.exports = router;