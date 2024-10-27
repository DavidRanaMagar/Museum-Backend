const express = require('express');
const router = express.Router();
const {ArtifactLoan} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const artifactLoan = await ArtifactLoan.findAll();
        res.json(artifactLoan);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching ArtifactLoan'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const artifactLoan = await ArtifactLoan.findByPk(id);
        res.json(artifactLoan);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an ArtifactLoan'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const artifactLoan = await ArtifactLoan.create(req.body);
        res.json(artifactLoan);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an ArtifactLoan'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const artifactLoan = await ArtifactLoan.findByPk(id);
        if (!artifactLoan) {
            return res.status(404).json({message: 'ArtifactLoan not found'});
        }
        await artifactLoan.destroy();
        // Send success response
        res.json({message: `ArtifactLoan with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching ArtifactLoan'});
    }
});

module.exports = router;