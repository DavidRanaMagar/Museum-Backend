const express = require('express');
const router = express.Router();
const { Ticket, SaleTicket, Sale, TicketStatus, TicketType } = require('../models');

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.findAll();
        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching tickets' });
    }
});

// Get ticket by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching the ticket' });
    }
});

// Insert a new ticket
router.post('/', async (req, res) => {
    const { ticketType, purchaseDate, eventDate, timeSlot, ticketStatus, customerID } = req.body;

    try {
        const ticket = await Ticket.create({
            ticketType,
            purchaseDate,
            eventDate,
            timeSlot,
            ticketStatus,
            customerID,
            updatedBy: 'online user',
            createdBy: 'online user',
        });
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while creating a ticket' });
    }
});

// Delete ticket by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        await ticket.destroy();
        // Send success response
        res.json({ message: `Ticket with id ${id} deleted successfully.` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while deleting the ticket' });
    }
});

// New endpoint: Get tickets by customerID
router.get('/customer/:customerID', async (req, res) => {
    const customerID = req.params.customerID;

    try {
        // Fetch tickets associated with the customerID
        const tickets = await Ticket.findAll({
            where: { customerID },
            include: [
                {
                    model: TicketType,
                    attributes: ['ticketType', 'ticketPrice'],
                },
                {
                    model: TicketStatus,
                    attributes: ['ticketStatus'],
                },
                {
                    model: SaleTicket,
                    include: [
                        {
                            model: Sale,
                            attributes: ['totalPrice', 'createdAt'],
                        },
                    ],
                },
            ],
        });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for this customer' });
        }

        // Format the ticket data to include relevant information (such as status, type, price)
        const formattedTickets = tickets.map(ticket => {
            return {
                ticketID: ticket.ticketID,
                ticketType: ticket.TicketType.ticketType,
                ticketPrice: ticket.TicketType.ticketPrice,
                ticketStatus: ticket.TicketStatus.ticketStatus,
                purchaseDate: ticket.purchaseDate,
                eventDate: ticket.eventDate,
                timeSlot: ticket.timeSlot,
                saleDetails: ticket.SaleTickets.map(saleTicket => ({
                    saleID: saleTicket.saleID,
                    totalPrice: saleTicket.Sale.totalPrice,
                    saleDate: saleTicket.Sale.createdAt,
                })),
            };
        });

        res.json(formattedTickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching customer tickets' });
    }
});

module.exports = router;
