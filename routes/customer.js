const express = require('express');
const router = express.Router();
const {Customer, Sex, Address} = require("../models");
const {NUMBER} = require("sequelize");


// get all
router.get('/', async (req, res) => {
    try {
        const customer = await Customer.findAll({
            include: [{
                model: Address,
                as: 'customerAddress',
            }, {
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

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByPk(id, {
            include: [{
                model: Address,
                as: 'customerAddress',
            }, {
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
        creditCardNumber,
        expiryDate,
        cvv,
        customerAddress
    } = req.body;

    const {
        streetAddress,
        city,
        state,
        postalCode,
        country
    } = customerAddress;

    try {
        // Check if address already exists
        let address = await Address.findOne({
            where: {
                streetAddress: customerAddress.streetAddress,
                city: customerAddress.city,
                state: customerAddress.state,
                postalCode: customerAddress.postalCode,
                country: customerAddress.country
            }
        });

        // If address doesn't exist, create it
        if (!address) {
            address = await Address.create({
                streetAddress,
                city,
                state,
                postalCode,
                country
            });
        }

        // Create customer with the found or created addressID
        const customer = await Customer.create({
            firstName,
            lastName,
            email,
            phone,
            dob,
            sex,
            creditCardNumber,
            expiryDate,
            cvv,
            address: address.addressID // Use the found/created address ID
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
        creditCardNumber,
        expiryDate,
        cvv,
        customerAddress
    } = req.body;

    const {
        streetAddress,
        city,
        state,
        postalCode,
        country
    } = customerAddress;

    try {
        // Check if customer exists
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Check if address already exists
        let address = await Address.findOne({
            where: {
                streetAddress,
                city,
                state,
                postalCode,
                country
            }
        });

        // If address doesn't exist, create it
        if (!address) {
            address = await Address.create({
                streetAddress,
                city,
                state,
                postalCode,
                country
            });
        }

        // Update customer with the found or created addressID
        await customer.update({
            firstName,
            lastName,
            email,
            phone,
            dob,
            sex,
            creditCardNumber,
            expiryDate,
            cvv,
            address: address.addressID // Use the found/created address ID
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