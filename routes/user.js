const express = require('express');
const router = express.Router();
const {User, UserRole} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const user = await User.findAll({
            include: [{
                model: UserRole,
                as: 'userRole'
            }]
        });
        // user.setRole(UserRole.findByPk(user.role));
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching User'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id,{
            include: [{
                model: UserRole,
                as: 'userRole'
            }]
        });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an User'});
    }
});

// get with username/password
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({
            where: { username, password },
            include: [{
                model: UserRole,
                as: 'userRole',  // Use the alias from the association
            }]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.json({
            userId: user.userID,
            role: user.userRole.role
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while logging in.' });
    }
});

//get user by username only
router.post('/register', async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({
            where: { username }
        });

        if (!user) {
            return res.json({ userExists: 'false' });
        }

        res.json({ userExists: 'true' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while checking if user is already exists.' });
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