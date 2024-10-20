const express = require('express');
const router = express.Router();
const {Customer} = require("../models");
const {Address} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const customer = await Customer.findAll();
        res.json(customer);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Customer'});
    }
});

//get by ID
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findByPk(id);
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
        streetAddress,
        city,
        state,
        postalCode,
        country
    } = req.body;

    try {
        // Check if address already exists
        let address = await Address.findOne({
            where: {
                streetAddress: streetAddress,
                city: city,
                state: state,
                postalCode: postalCode,
                country: country
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
        res.status(500).json({ message: 'An error occurred while creating a customer' });
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