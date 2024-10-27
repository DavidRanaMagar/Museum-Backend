const express = require('express');
const router = express.Router();
const {SaleTicket} = require("../models");

//get all
router.get('/', async (req, res) => {
    try {
        const saleTicket = await SaleTicket.findAll()
        res.json(saleTicket);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching saleTransaction'});
    }
});

//get by id
router.get('/:id', async (req, res) => {
    try {
        const saleTicket = await SaleTicket.findByPk(id)
        res.json(saleTicket);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching saleTransaction'});
    }
});

//insert
router.post('/', async (req, res) => {
    try {
        const saleTicket = await SaleTicket.create(req.body);
        res.json(saleTicket);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an saleTransaction'});
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const saleTicket = await SaleTicket.findByPk(id);
        if (!saleTicket) {
            return res.status(404).json({message: 'User not found'});
        }
        await saleTicket.destroy();
        res.json({message: `User with id ${id} deleted successfully.`});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching User'});
    }
});

module.exports = router;