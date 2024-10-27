const express = require('express');
const router = express.Router();
const {GiftShopItemColor} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const giftShopItemColor = await GiftShopItemColor.findAll();
        res.json(giftShopItemColor);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching GiftShopItemColor'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const giftShopItemColor = await GiftShopItemColor.findByPk(id);
        res.json(giftShopItemColor);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an GiftShopItemColor'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const giftShopItemColor = await GiftShopItemColor.create(req.body);
        res.json(giftShopItemColor);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an GiftShopItemColor'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const giftShopItemColor = await GiftShopItemColor.findByPk(id);
        if (!giftShopItemColor) {
            return res.status(404).json({message: 'GiftShopItemColor not found'});
        }
        await giftShopItemColor.destroy();
        // Send success response
        res.json({message: `GiftShopItemColor with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching GiftShopItemColor'});
    }
});

module.exports = router;