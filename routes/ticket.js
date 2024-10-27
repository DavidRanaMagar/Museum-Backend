const express = require('express');
const router = express.Router();
const {Ticket} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const ticket = await Ticket.findAll();
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Ticket'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ticket = await Ticket.findByPk(id);
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Ticket'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Ticket'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({message: 'Ticket not found'});
        }
        await ticket.destroy();
        // Send success response
        res.json({message: `Ticket with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Ticket'});
    }
});

module.exports = router;