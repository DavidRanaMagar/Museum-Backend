const express = require('express');
const router = express.Router();
const {Address} = require('../models');


//get all
router.get('/', async (req, res) => {
    try {
        const address = await Address.findAll();
        res.json(address);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching address'});
    }
});

// get with ID
router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const address = await Address.findByPk(id);
            res.json(address);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while fetching an address'});
        }
    }
);

// insert
router.post('/', async (req, res) => {
        try {
            const address = await Address.create(req.body);
            res.json(address);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while creating an address'});
        }
    }
);

// delete with id
router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id; // Get the id from the route parameters
            const address = await Address.findByPk(id);
            if (!address) {
                // If the Address doesn't exist, return a 404 response
                return res.status(404).json({message: 'Address not found'});
            }
            await address.destroy();
            // Send success response
            res.json({message: `Address with id ${id} deleted successfully.`});

        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while fetching Address'});
        }
    }
);


module.exports = router;