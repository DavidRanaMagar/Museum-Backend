const express = require('express');
const router = express.Router();
const {Artifact} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const artifacts = await Artifact.findAll();
        res.json(artifacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching artifacts'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const artifact = await Artifact.findByPk(id);
        res.json(artifact);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an artifact'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const artifact = await Artifact.create(req.body);
        res.json(artifact);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an artifact'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const artifact = await Artifact.findByPk(id);
        if (!artifact) {
            // If the Artifact doesn't exist, return a 404 response
            return res.status(404).json({message: 'Artifact not found'});
        }
        await artifact.destroy();
        // Send success response
        res.json({message: `Artifact with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Artifact'});
    }
});


module.exports = router;