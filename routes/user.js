const express = require('express');
const router = express.Router();
const {User} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching User'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an User'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an User'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        await user.destroy();
        // Send success response
        res.json({message: `User with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching User'});
    }
});

module.exports = router;