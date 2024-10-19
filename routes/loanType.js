const express = require('express');
const router = express.Router();
const {LoanType} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const loanType = await LoanType.findAll();
        res.json(loanType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching LoanType'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const loanType = await LoanType.findByPk(id);
        res.json(loanType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an LoanType'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const loanType = await LoanType.create(req.body);
        res.json(loanType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an LoanType'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const loanType = await LoanType.findByPk(id);
        if (!loanType) {
            return res.status(404).json({message: 'LoanType not found'});
        }
        await loanType.destroy();
        // Send success response
        res.json({message: `LoanType with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching LoanType'});
    }
});

module.exports = router;