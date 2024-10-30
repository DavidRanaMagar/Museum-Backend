const express = require('express');
const router = express.Router();
const { sequelize, Artifact } = require('../models'); // Adjust the path to your models
const { Op, literal } = require('sequelize');  // Import Op for query operators


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

router.post('/available', async (req, res) => {
    let { startDate, endDate } = req.body;

    startDate = isValidDate(startDate) ? startDate : '0000-01-01';
    endDate = isValidDate(endDate) ? endDate : '9999-12-31';

    try {
        const artifacts = await Artifact.findAll({
            where: {
                artifactID: {
                    [Op.notIn]: literal(`(
                        SELECT artifactID FROM artifact_exhibition ae
                        JOIN exhibition e ON ae.exhibitionID = e.exhibitionId
                        WHERE (
                            (e.startDate < :endDate AND e.endDate > :startDate)
                        )
                    )`)
                }
            },
            replacements: { startDate, endDate }
        });

        res.json(artifacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching available artifacts' });
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

function isValidDate(date) {
    return !isNaN(Date.parse(date));
}

module.exports = router;