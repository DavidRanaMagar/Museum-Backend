const express = require('express');
const router = express.Router();
const {ArtifactExhibition} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const artifactExhibition = await ArtifactExhibition.findAll();
        res.json(artifactExhibition);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching ArtifactExhibition'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const artifactExhibition = await ArtifactExhibition.findByPk(id);
        res.json(artifactExhibition);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an ArtifactExhibition'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const artifactExhibition = await ArtifactExhibition.create(req.body);
        res.json(artifactExhibition);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an ArtifactExhibition'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const artifactExhibition = await ArtifactExhibition.findByPk(id);
        if (!artifactExhibition) {
            return res.status(404).json({message: 'ArtifactExhibition not found'});
        }
        await artifactExhibition.destroy();
        // Send success response
        res.json({message: `ArtifactExhibition with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching ArtifactExhibition'});
    }
});

module.exports = router;