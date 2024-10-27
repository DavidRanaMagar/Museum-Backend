const express = require('express');
const router = express.Router();
const {Color} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const color = await Color.findAll();
        res.json(color);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching color'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const color = await Color.findByPk(id);
        res.json(color);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an color'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const color = await Color.create(req.body);
        res.json(color);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an color'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const color = await Color.findByPk(id);
        if (!color) {
            return res.status(404).json({message: 'Color not found'});
        }
        await color.destroy();
        // Send success response
        res.json({message: `Color with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Color'});
    }
});

module.exports = router;