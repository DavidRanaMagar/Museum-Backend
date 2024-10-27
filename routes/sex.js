const express = require('express');
const router = express.Router();
const {Sex} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const sex = await Sex.findAll();
        res.json(sex);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Sex'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sex = await Sex.findByPk(id);
        res.json(sex);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Sex'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const sex = await Sex.create(req.body);
        res.json(sex);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Sex'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const sex = await Sex.findByPk(id);
        if (!sex) {
            return res.status(404).json({message: 'Sex not found'});
        }
        await sex.destroy();
        // Send success response
        res.json({message: `Sex with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Sex'});
    }
});

module.exports = router;