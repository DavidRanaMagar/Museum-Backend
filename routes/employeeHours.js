const express = require('express');
const router = express.Router();
const {EmployeeHours, Employee, sequelize} = require("../models");
const {QueryTypes, Op} = require('sequelize');


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
    const {employeeID, startDate, endDate} = req.query;

    // Validate the required query parameters
    if (!employeeID || !startDate || !endDate) {
        return res.status(400).json({message: 'employeeID, startDate, and endDate are required'});
    }

    try {
        const results = await sequelize.query(
            `SELECT 
                employee_hours.*,
                employee.*
            FROM 
                employee_hours
            INNER JOIN 
                employee
            ON 
                employee_hours.employeeID = employee.employeeID
            WHERE 
                employee_hours.employeeID = :employeeID
                AND employee_hours.workDate BETWEEN :startDate AND :endDate`,
            {
                replacements: {
                    employeeID: employeeID,   // Replace with actual employee ID
                    startDate: new Date(startDate),  // Convert to Date object if needed
                    endDate: new Date(endDate)       // Convert to Date object if needed
                },
                type: QueryTypes.SELECT  // Ensures the query is treated as a SELECT query
            }
        );
        // Transform the results to nest employee data inside employee key
        const employeeHours = results.map(result => {
            return {
                employeeID: result.employeeID,  // From employee_hours table
                workDate: result.workDate,
                hoursWorked: result.hoursWorked,
                employee: {
                    employeeID: result.employeeID,  // From employee table
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    jobTitle: result.jobTitle,
                    department: result.department
                }
            };
        });

        // Return the found records as JSON
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
        const employeeHours = await EmployeeHours.findAll({
            where: {employeeID: id},
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