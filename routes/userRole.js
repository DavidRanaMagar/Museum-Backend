const express = require('express');
const router = express.Router();
const {UserRole} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const userRole = await UserRole.findAll();
        res.json(userRole);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching UserRole'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userRole = await User.findByPk(id);
        res.json(userRole);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an UserRole'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const userRole = await userRole.create(req.body);
        res.json(userRole);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an UserRole'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const userRole = await UserRole.findByPk(id);
        if (!userRole) {
            return res.status(404).json({message: 'User not found'});
        }
        await userRole.destroy();
        // Send success response
        res.json({message: `UserRole with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching UserRole'});
    }
});

module.exports = router;