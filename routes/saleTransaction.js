const express = require('express');
const router = express.Router();
const {SaleTransaction} = require("../models");

//get all
router.get('/', async (req, res) => {
    try {
        const saleTransaction = await SaleTransaction.findAll()
        res.json(saleTransaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching saleTransaction'});
    }
});

//get by id
router.get('/:id', async (req, res) => {
    try {
        const saleTransaction = await SaleTransaction.findByPk(id)
        res.json(saleTransaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching saleTransaction'});
    }
});

//insert
router.post('/', async (req, res) => {
    try {
        const saleTransaction = await SaleTransaction.create(req.body);
        res.json(saleTransaction);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an saleTransaction'});
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const saleTransaction = await SaleTransaction.findByPk(id);
        if (!saleTransaction) {
            return res.status(404).json({message: 'User not found'});
        }
        await saleTransaction.destroy();
        res.json({message: `User with id ${id} deleted successfully.`});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching User'});
    }
});

module.exports = router;
