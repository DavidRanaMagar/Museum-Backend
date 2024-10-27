const express = require('express');
const router = express.Router();
const {EmployeeHours, Employee} = require("../models");
const { Op } = require('sequelize');


// get all
router.get('/', async (req, res) => {
    try {
        const employeeHours = await EmployeeHours.findAll();
        res.json(employeeHours);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching EmployeeHours'});
    }
});

// Search employees based on query parameters
router.get('/search', async (req, res) => {
    const { employeeID, startDate, endDate } = req.query;

    if (!employeeID || !startDate || !endDate) {
        return res.status(400).json({ message: 'employeeID, startDate, and endDate are required' });
    }

    try {
        const employeeHours = await EmployeeHours.findAll({
            where: {
                employeeID: employeeID,
                workDate: {
                    [Op.between]: [new Date(startDate), new Date(endDate)]
                }
            },
            include: [{
                model: Employee,
                as: 'employee'
            }]
        });

        // Return the found records
        res.json(employeeHours);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching EmployeeHours' });
    }
});


//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employeeHours = await EmployeeHours.findAll({
            where: { employeeID: id },
            include: [{
                model: Employee,
                as: 'employee',
            }]
        });
        res.json(employeeHours);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an EmployeeHours'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const employeeHours = await EmployeeHours.create(req.body);
        res.json(employeeHours);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an EmployeeHours'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const employeeHours = await EmployeeHours.findByPk(id);
        if (!employeeHours) {
            return res.status(404).json({message: 'EmployeeHours not found'});
        }
        await employeeHours.destroy();
        // Send success response
        res.json({message: `EmployeeHours with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching EmployeeHours'});
    }
});

module.exports = router;