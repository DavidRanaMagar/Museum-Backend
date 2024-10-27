const express = require('express');
const router = express.Router();
const {JobTitle} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const jobTitle = await JobTitle.findAll();
        res.json(jobTitle);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching JobTitle'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const jobTitle = await JobTitle.findByPk(id);
        res.json(jobTitle);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an JobTitle'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const jobTitle = await JobTitle.create(req.body);
        res.json(jobTitle);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an JobTitle'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const jobTitle = await JobTitle.findByPk(id);
        if (!jobTitle) {
            return res.status(404).json({message: 'JobTitle not found'});
        }
        await jobTitle.destroy();
        // Send success response
        res.json({message: `JobTitle with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching JobTitle'});
    }
});

module.exports = router;