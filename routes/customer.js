const express = require('express');
const router = express.Router();
const {Customer, Sex, Address, User} = require("../models");
const {NUMBER} = require("sequelize");


// get all
router.get('/', async (req, res) => {
    try {
        const customer = await Customer.findAll({
            include: [{
                model: Sex,
                as: 'gender',
            }]
        });
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Customer'});
    }
});

//get by userID
router.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findOne({
            where: { userID: id}
        });

        if (!customer) {
            return res.status(401).json({ message: 'No customer attached to this user.' });
        }

        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Customer'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByPk(id, {
            include: [{
                model: Sex,
                as: 'gender',
            }]
        });
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Customer'});
    }
});

// insert
router.post('/', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        sex,
        user
    } = req.body;

    const {
        username,
        password,
        role,
        createdBy,
        updatedBy
    } = user;

    try {
        const newUser = await User.create({
            username,
            password,
            role,
            createdBy,
            updatedBy
        });

        const customer = await Customer.create({
            firstName,
            lastName,
            email,
            phone,
            dob,
            sex,  // This will use the foreign key for 'Sex'
            updatedBy: newUser.updatedBy,
            createdBy: newUser.createdBy,
            userID: newUser.userID  // Use the userID from the created user
        });

        res.status(201).json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating a customer'});
    }
});

router.post('/naUser', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        sex,
    } = req.body;

    try {

        const customer = await Customer.create({
            firstName,
            lastName,
            email,
            phone,
            dob,
            sex,  // This will use the foreign key for 'Sex'
            updatedBy: 'admin',
            createdBy: 'admin',
        });

        res.status(201).json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating a customer'});
    }
});

// update
router.put('/:id', async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        sex,
    } = req.body;

    try {
        // Check if customer exists
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Update customer with the found or created addressID
        await customer.update({
            firstName,
            lastName,
            email,
            phone,
            dob,
            sex,
        });

        res.status(200).json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while updating the customer' });
    }
});


//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({message: 'Customer not found'});
        }
        await customer.destroy();
        // Send success response
        res.json({message: `Customer with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Customer'});
    }
});

module.exports = router;