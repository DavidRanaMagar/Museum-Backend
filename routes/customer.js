const express = require('express');
const router = express.Router();
const {Customer} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const customer = await Customer.findAll();
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Customer'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByPk(id);
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Customer'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Customer'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        await customer.destroy();
        // Send success response
        res.json({message: `Customer with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Customer'});
    }
});

module.exports = router;