const express = require('express');
const router = express.Router();
const {Ticket, Exhibition, Customer, User, sequelize} = require('../models');
const {QueryTypes, Sequelize, Op} = require("sequelize");

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.findAll({
            include: [{
                model: Exhibition,
                as: 'exhibition',
            }]
        });
        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching tickets'});
    }
});

// Get ticket according to customer firstName, lastName, email, phone, username, ticketID
router.get('/search', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, ticketID } = req.query;  // Search query from the request

        // Initialize an array to hold conditions
        const conditions = [];

        // Add conditions only if the query parameters are not empty
        if (firstName) {
            conditions.push({ '$customer.firstName$': { [Sequelize.Op.like]: `%${firstName}%` } });
        }
        if (lastName) {
            conditions.push({ '$customer.lastName$': { [Sequelize.Op.like]: `%${lastName}%` } });
        }
        if (email) {
            conditions.push({ '$customer.email$': { [Sequelize.Op.like]: `%${email}%` } });
        }
        if (phone) {
            conditions.push({ '$customer.phone$': { [Sequelize.Op.like]: `%${phone}%` } });
        }
        if (ticketID) {
            conditions.push({ ticketID: ticketID });
        }
        // Query the database with dynamically built conditions
        const tickets = await Ticket.findAll({
            include: [{
                model: Customer,
                as: 'customer',
                attributes: ['firstName', 'lastName', 'email', 'phone']  // Include customer details
            }],
            where: {
                [Sequelize.Op.and]: conditions  // Use the conditions array
            }
        });

        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).send('Error fetching tickets');
    }
});



// New endpoint: Get tickets by customerID
router.get('/customer/:customerID', async (req, res) => {
    const customerID = req.params.customerID;

    try {
        // Fetch tickets associated with the customerID
        const tickets = await Ticket.findAll({
            where: {customerID},
            include: [{
                model: Exhibition,
                as: 'exhibition',
            }]
        });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({message: 'No tickets found for this customer'});
        }

        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching customer tickets'});
    }
});

// Get ticket by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({message: 'Ticket not found'});
        }
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching the ticket'});
    }
});

// Insert a new ticket
router.post('/', async (req, res) => {
    const {ticketType, purchaseDate, eventDate, ticketStatus, timeSlot, customerID, exhibitionID} = req.body;

    try {
        const ticket = await Ticket.create({
            ticketType,
            purchaseDate,
            eventDate,
            ticketStatus,
            timeSlot,
            customerID,
            exhibitionID,
            updatedBy: 'online user',
            createdBy: 'online user',
        });
        res.json(ticket);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating a ticket'});
    }
});

//update status
router.put('/:ticketID/status', async (req, res) => {
    const {ticketID} = req.params;
    const {ticketStatus} = req.body;

    try {
        // Find the ticket by ID
        const ticket = await Ticket.findByPk(ticketID);

        if (!ticket) {
            return res.status(404).json({message: 'Ticket not found'});
        }

        // Update the ticketStatus
        ticket.ticketStatus = ticketStatus;
        ticket.updatedBy = 'online user';
        await ticket.save();

        res.json({message: 'Ticket status updated successfully', ticket});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while updating the ticket status'});
    }
});

// Delete ticket by ID
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
        res.status(500).json({message: 'An error occurred while deleting the ticket'});
    }
});


// Get Tickets by Filters
router.post('/filter', async (req, res) => {
    try {
        const {
            eventDateLower,
            eventDateUpper,
            purchaseDateLower,
            purchaseDateUpper,
            timeSlotLower,
            timeSlotUpper,
            selectedTicketTypes,
            selectedTicketStatuses
        } = req.body;

        let whereClause = `
            (t.eventDate >= :eventDateLower)
            AND (t.eventDate <= :eventDateUpper)
            AND (t.purchaseDate >= :purchaseDateLower)
            AND (t.purchaseDate <= :purchaseDateUpper)
            AND (t.timeSlot >= :timeSlotLower)
            AND (t.timeSlot <= :timeSlotUpper)
        `;

        if (selectedTicketTypes && selectedTicketTypes.length > 0) {
            whereClause += ` AND (t.ticketType IN (:selectedTicketTypes))`;
        }
        if (selectedTicketStatuses && selectedTicketStatuses.length > 0) {
            whereClause += ` AND (t.ticketStatus IN (:selectedTicketStatuses))`;
        }

        const tickets = await sequelize.query(
            `
            SELECT * 
            FROM ticket AS t
            WHERE ${whereClause}
            `,
            {
                replacements: {
                    eventDateLower: eventDateLower || '0000-01-01',
                    eventDateUpper: eventDateUpper || '9999-12-31',
                    purchaseDateLower: purchaseDateLower || '0000-01-01',
                    purchaseDateUpper: purchaseDateUpper || '9999-12-31',
                    timeSlotLower: timeSlotLower || '00:00:00',
                    timeSlotUpper: timeSlotUpper || '23:59:59',
                    selectedTicketTypes: selectedTicketTypes.length ? selectedTicketTypes : undefined,
                    selectedTicketStatuses: selectedTicketStatuses.length ? selectedTicketStatuses : undefined,
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching the tickets'});
    }
});

router.post('/filter/monthly', async (req, res) => {
    try {
        const {
            eventDateLower,
            eventDateUpper,
            purchaseDateLower,
            purchaseDateUpper,
            timeSlotLower,
            timeSlotUpper,
            selectedTicketTypes,
            selectedTicketStatuses
        } = req.body;

        let whereClause = `
            (t.eventDate >= :eventDateLower)
            AND (t.eventDate <= :eventDateUpper)
            AND (t.purchaseDate >= :purchaseDateLower)
            AND (t.purchaseDate <= :purchaseDateUpper)
            AND (t.timeSlot >= :timeSlotLower)
            AND (t.timeSlot <= :timeSlotUpper)
        `;

        if (selectedTicketTypes && selectedTicketTypes.length > 0) {
            whereClause += ` AND (t.ticketType IN (:selectedTicketTypes))`;
        }
        if (selectedTicketStatuses && selectedTicketStatuses.length > 0) {
            whereClause += ` AND (t.ticketStatus IN (:selectedTicketStatuses))`;
        }

        const ticketAggregate = await sequelize.query(
            `
            SELECT COUNT(t.ticketID) AS ticketCount, SUM(tt.ticketPrice) AS totalAmount, MONTH(t.purchaseDate) AS period
            FROM ticket AS t JOIN ticket_type AS tt on t.ticketType = tt.ticketTypeCode
            WHERE ${whereClause}
            GROUP BY MONTH(t.purchaseDate);
            `,
            {
                replacements: {
                    eventDateLower: eventDateLower || '0000-01-01',
                    eventDateUpper: eventDateUpper || '9999-12-31',
                    purchaseDateLower: purchaseDateLower || '0000-01-01',
                    purchaseDateUpper: purchaseDateUpper || '9999-12-31',
                    timeSlotLower: timeSlotLower || '00:00:00',
                    timeSlotUpper: timeSlotUpper || '23:59:59',
                    selectedTicketTypes: selectedTicketTypes.length ? selectedTicketTypes : undefined,
                    selectedTicketStatuses: selectedTicketStatuses.length ? selectedTicketStatuses : undefined,
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(ticketAggregate);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching monthly aggregates'});
    }
});

router.post('/filter/quarterly', async (req, res) => {
    try {
        const {
            eventDateLower,
            eventDateUpper,
            purchaseDateLower,
            purchaseDateUpper,
            timeSlotLower,
            timeSlotUpper,
            selectedTicketTypes,
            selectedTicketStatuses
        } = req.body;

        let whereClause = `
            (t.eventDate >= :eventDateLower)
            AND (t.eventDate <= :eventDateUpper)
            AND (t.purchaseDate >= :purchaseDateLower)
            AND (t.purchaseDate <= :purchaseDateUpper)
            AND (t.timeSlot >= :timeSlotLower)
            AND (t.timeSlot <= :timeSlotUpper)
        `;

        if (selectedTicketTypes && selectedTicketTypes.length > 0) {
            whereClause += ` AND (t.ticketType IN (:selectedTicketTypes))`;
        }
        if (selectedTicketStatuses && selectedTicketStatuses.length > 0) {
            whereClause += ` AND (t.ticketStatus IN (:selectedTicketStatuses))`;
        }

        const ticketAggregate = await sequelize.query(
            `
            SELECT COUNT(t.ticketID) AS ticketCount, SUM(tt.ticketPrice) AS totalAmount, (MONTH(t.purchaseDate) - 1) DIV 3 + 1 AS period
            FROM ticket AS t JOIN ticket_type AS tt on t.ticketType = tt.ticketTypeCode
            WHERE ${whereClause}
            GROUP BY (MONTH(t.purchaseDate) - 1) DIV 3 + 1;
            `,
            {
                replacements: {
                    eventDateLower: eventDateLower || '0000-01-01',
                    eventDateUpper: eventDateUpper || '9999-12-31',
                    purchaseDateLower: purchaseDateLower || '0000-01-01',
                    purchaseDateUpper: purchaseDateUpper || '9999-12-31',
                    timeSlotLower: timeSlotLower || '00:00:00',
                    timeSlotUpper: timeSlotUpper || '23:59:59',
                    selectedTicketTypes: selectedTicketTypes.length ? selectedTicketTypes : undefined,
                    selectedTicketStatuses: selectedTicketStatuses.length ? selectedTicketStatuses : undefined,
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(ticketAggregate);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching monthly aggregates'});
    }
});

router.post('/filter/yearly', async (req, res) => {
    try {
        const {
            eventDateLower,
            eventDateUpper,
            purchaseDateLower,
            purchaseDateUpper,
            timeSlotLower,
            timeSlotUpper,
            selectedTicketTypes,
            selectedTicketStatuses
        } = req.body;

        let whereClause = `
            (t.eventDate >= :eventDateLower)
            AND (t.eventDate <= :eventDateUpper)
            AND (t.purchaseDate >= :purchaseDateLower)
            AND (t.purchaseDate <= :purchaseDateUpper)
            AND (t.timeSlot >= :timeSlotLower)
            AND (t.timeSlot <= :timeSlotUpper)
        `;

        if (selectedTicketTypes && selectedTicketTypes.length > 0) {
            whereClause += ` AND (t.ticketType IN (:selectedTicketTypes))`;
        }
        if (selectedTicketStatuses && selectedTicketStatuses.length > 0) {
            whereClause += ` AND (t.ticketStatus IN (:selectedTicketStatuses))`;
        }

        const ticketAggregate = await sequelize.query(
            `
            SELECT COUNT(t.ticketID) AS ticketCount, SUM(tt.ticketPrice) AS totalAmount, YEAR(t.purchaseDate) AS period
            FROM ticket AS t JOIN ticket_type AS tt on t.ticketType = tt.ticketTypeCode
            WHERE ${whereClause}
            GROUP BY YEAR(t.purchaseDate);
            `,
            {
                replacements: {
                    eventDateLower: eventDateLower || '0000-01-01',
                    eventDateUpper: eventDateUpper || '9999-12-31',
                    purchaseDateLower: purchaseDateLower || '0000-01-01',
                    purchaseDateUpper: purchaseDateUpper || '9999-12-31',
                    timeSlotLower: timeSlotLower || '00:00:00',
                    timeSlotUpper: timeSlotUpper || '23:59:59',
                    selectedTicketTypes: selectedTicketTypes.length ? selectedTicketTypes : undefined,
                    selectedTicketStatuses: selectedTicketStatuses.length ? selectedTicketStatuses : undefined,
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(ticketAggregate);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching monthly aggregates'});
    }
});

module.exports = router;
