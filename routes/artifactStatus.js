const express = require('express');
const router = express.Router();
const {ArtifactStatus} = require('../models');


//get all
router.get('/', async (req, res) => {
    try {
        const artifactStatus = await ArtifactStatus.findAll();
        res.json(artifactStatus);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Artifact Status'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id; // Get the id from the route parameters
            const artifactStatus = await ArtifactStatus.findByPk(id);
            res.json(artifactStatus);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while fetching an Artifact Status'});
        }
    }
);

// insert
router.post('/', async (req, res) => {
        try {
            const artifactStatus = await ArtifactStatus.create(req.body);
            res.json(artifactStatus);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while creating an Artifact Status'});
        }
    }
);

// delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const artifactStatus = await ArtifactStatus.findByPk(id);
        if (!artifactStatus) {
            // If the Artifact Status doesn't exist, return a 404 response
            return res.status(404).json({message: 'Artifact Status not found'});
        }
        await artifactStatus.destroy();
        // Send success response
        res.json({message: `Artifact Status with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Artifact Status'});
    }
});

module.exports = router;