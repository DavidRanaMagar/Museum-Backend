const express = require('express');
const router = express.Router();
const {Exhibition, sequelize} = require("../models");
const {QueryTypes, Op} = require("sequelize");


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
router.get('/:id', async (req, res) => {
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
        console.log(req.body);
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

router.get('/:id/artifacts', async (req, res) => {
    const exhibitionID = req.params.id;

    try {
        const artifacts = await sequelize.query(
            `
            SELECT a.creator AS creator, a.title AS title
            FROM artifact a
                JOIN artifact_exhibition ae ON a.artifactID = ae.artifactID
                JOIN exhibition e ON ae.exhibitionID = e.exhibitionID
            WHERE e.exhibitionID = :exhibitionID;
            `,
            {
                replacements: { exhibitionID },
                type: QueryTypes.SELECT
            }
        );

        res.json(artifacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Exhibition'});
    }
});

//get by date
router.post('/date', async (req, res) => {
    const { date } = req.body; // Expecting `date` in the format 'YYYY-MM-DD'

    if (!date) {
        return res.status(400).json({ message: 'Date is required in the request body.' });
    }

    try {
        const exhibitions = await Exhibition.findAll({
            where: {
                startDate: { [Op.lte]: date },
                endDate: { [Op.gte]: date }
            }
        });

        res.json(exhibitions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while retrieving exhibitions.' });
    }
});

module.exports = router;