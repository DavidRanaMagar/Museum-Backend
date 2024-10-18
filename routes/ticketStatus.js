const express = require('express');
const router = express.Router();
const {TicketStatus} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const ticketStatus = await TicketStatus.findAll();
        res.json(ticketStatus);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching TicketStatus'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const ticketStatus = await TicketStatus.findByPk(id);
        res.json(ticketStatus);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an TicketStatus'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const ticketStatus = await TicketStatus.create(req.body);
        res.json(ticketStatus);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an TicketStatus'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const ticketStatus = await TicketStatus.findByPk(id);
        if (!ticketStatus) {
            return res.status(404).json({message: 'TicketStatus not found'});
        }
        await ticketStatus.destroy();
        // Send success response
        res.json({message: `TicketStatus with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching TicketStatus'});
    }
});

module.exports = router;