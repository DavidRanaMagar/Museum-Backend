const express = require('express');
const router = express.Router();
const {Employee} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const employee = await Employee.findAll();
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Employee'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findByPk(id);
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Employee'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Employee'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({message: 'Employee not found'});
        }
        await employee.destroy();
        // Send success response
        res.json({message: `Employee with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Employee'});
    }
});

module.exports = router;