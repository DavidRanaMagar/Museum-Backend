const express = require('express');
const router = express.Router();
const {TicketType} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const ticketType = await TicketType.findAll();
        res.json(ticketType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching TicketType'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ticketType = await TicketType.findByPk(id);
        res.json(ticketType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an TicketType'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const ticketType = await TicketType.create(req.body);
        res.json(ticketType);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an TicketType'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const ticketType = await TicketType.findByPk(id);
        if (!ticketType) {
            return res.status(404).json({message: 'TicketType not found'});
        }
        await ticketType.destroy();
        // Send success response
        res.json({message: `TicketType with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching TicketType'});
    }
});

module.exports = router;