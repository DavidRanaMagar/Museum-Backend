const express = require('express');
const router = express.Router();
const {Loan} = require("../models");


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
router.get('/:id ', async (req, res) => {
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

module.exports = router;