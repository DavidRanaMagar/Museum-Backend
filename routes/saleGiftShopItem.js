const express = require('express');
const router = express.Router();
const {SaleGiftShopItem} = require('../models');


//get all
router.get('/', async (req, res) => {
    try {
        const saleGiftShopItem = await SaleGiftShopItem.findAll();
        res.json(saleGiftShopItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching SaleGiftShopItem'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id; // Get the id from the route parameters
            const saleGiftShopItem = await SaleGiftShopItem.findByPk(id);
            res.json(saleGiftShopItem);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while fetching an SaleGiftShopItem'});
        }
    }
);

// insert
router.post('/', async (req, res) => {
        try {
            const saleGiftShopItem = await SaleGiftShopItem.create(req.body);
            res.json(saleGiftShopItem);
        } catch (err) {
            console.error(err);
            res.status(500).json({message: 'An error occurred while creating an SaleGiftShopItem'});
        }
    }
);

// delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const saleGiftShopItem = await SaleGiftShopItem.findByPk(id);
        if (!saleGiftShopItem) {
            // If the Artifact Status doesn't exist, return a 404 response
            return res.status(404).json({message: 'Artifact Status not found'});
        }
        await saleGiftShopItem.destroy();
        // Send success response
        res.json({message: `Artifact Status with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching SaleGiftShopItem'});
    }
});

module.exports = router;