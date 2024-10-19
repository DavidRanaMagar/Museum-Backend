const express = require('express');
const router = express.Router();
const {Exhibition} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const exhibition = await Exhibition.findAll();
        res.json(exhibition);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Exhibition'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const exhibition = await Exhibition.findByPk(id);
        res.json(exhibition);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Exhibition'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const exhibition = await Exhibition.create(req.body);
        res.json(exhibition);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Exhibition'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const exhibition = await Exhibition.findByPk(id);
        if (!exhibition) {
            return res.status(404).json({message: 'Exhibition not found'});
        }
        await exhibition.destroy();
        // Send success response
        res.json({message: `Exhibition with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Exhibition'});
    }
});

module.exports = router;