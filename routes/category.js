const express = require('express');
const router = express.Router();
const {CCategory} = require('../models');


// get all
router.get('/', async (req, res) => {
    try {
        const category = await CCategory.findAll();
        res.status(200).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Category'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await CCategory.findByPk(req.params.id);
        res.status(200).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Category'});
    }
});


// insert
router.post('/', async (req, res) => {
    try {
        const category = await CCategory.create(req.body);
        res.status(200).json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Category'})
    }
});

// delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const category = await CCategory.findByPk(id);
        if (!category) {
            // If the category doesn't exist, return a 404 response
            return res.status(404).json({message: 'Category not found'});
        }
        // Delete the category
        await category.destroy();
        // Send success response
        res.json({message: `Category with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Category'});
    }
});

module.exports = router;