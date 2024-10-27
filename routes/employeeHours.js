const express = require('express');
const router = express.Router();
const {EmployeeHours} = require("../models");


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

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const employeeHours = await EmployeeHours.findByPk(id);
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