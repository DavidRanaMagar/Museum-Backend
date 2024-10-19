const express = require('express');
const router = express.Router();
const {Sale} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const sale = await Sale.findAll();
        res.json(sale);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Sale'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const sale = await Sale.findByPk(id);
        res.json(sale);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Sale'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const sale = await Sale.create(req.body);
        res.json(sale);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Sale'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const sale = await Sale.findByPk(id);
        if (!sale) {
            return res.status(404).json({message: 'Sale not found'});
        }
        await sale.destroy();
        // Send success response
        res.json({message: `Sale with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Sale'});
    }
});

module.exports = router;