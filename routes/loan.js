const express = require('express');
const router = express.Router();
const {Loan, sequelize} = require("../models");
const {QueryTypes} = require("sequelize");


// get all
router.get('/', async (req, res) => {
    try {
        const loan = await Loan.findAll();
        res.json(loan);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Loan'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const loan = await Loan.findByPk(id);
        res.json(loan);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Loan'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const loan = await Loan.create(req.body);
        res.json(loan);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Loan'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const loan = await Loan.findByPk(id);
        if (!loan) {
            return res.status(404).json({message: 'Loan not found'});
        }
        await loan.destroy();
        // Send success response
        res.json({message: `Loan with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Loan'});
    }
});

router.get('/:id/artifacts', async (req, res) => {
    const loanID = req.params.id;

    try {
        const artifacts = await sequelize.query(
            `
            SELECT a.creator AS creator, a.title AS title
            FROM artifact a
                JOIN artifact_loan al ON a.artifactID = al.artifactID
                JOIN loan l ON al.loanID = l.loanID
            WHERE l.loanID = :loanID;
            `,
            {
                replacements: { loanID: loanID },
                type: QueryTypes.SELECT
            }
        );

        res.json(artifacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Exhibition'});
    }
});

module.exports = router;