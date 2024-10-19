const express = require('express');
const router = express.Router();
const {Transaction} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const transaction = await Transaction.findAll();
        res.json(transaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Transaction'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const transaction = await Transaction.findByPk(id);
        res.json(transaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Transaction'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.json(transaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Transaction'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const transaction = await Transaction.findByPk(id);
        if (!transaction) {
            return res.status(404).json({message: 'Transaction not found'});
        }
        await transaction.destroy();
        // Send success response
        res.json({message: `Transaction with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Transaction'});
    }
});

module.exports = router;