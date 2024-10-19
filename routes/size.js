const express = require('express');
const router = express.Router();
const {Size} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const size = await Size.findAll();
        res.json(size);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Size'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const size = await Size.findByPk(id);
        res.json(size);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Size'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const size = await Size.create(req.body);
        res.json(size);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Size'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const size = await Size.findByPk(id);
        if (!size) {
            return res.status(404).json({message: 'Size not found'});
        }
        await size.destroy();
        // Send success response
        res.json({message: `Size with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Size'});
    }
});

module.exports = router;