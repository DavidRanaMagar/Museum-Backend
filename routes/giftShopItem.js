const express = require('express');
const router = express.Router();
const {GiftShopItem} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const giftShopItem = await GiftShopItem.findAll();
        res.json(giftShopItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching GiftShopItem'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const giftShopItem = await GiftShopItem.findByPk(id);
        res.json(giftShopItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an GiftShopItem'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const giftShopItem = await GiftShopItem.create(req.body);
        res.json(giftShopItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an GiftShopItem'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const giftShopItem = await GiftShopItem.findByPk(id);
        if (!giftShopItem) {
            return res.status(404).json({message: 'GiftShopItem not found'});
        }
        await giftShopItem.destroy();
        // Send success response
        res.json({message: `GiftShopItem with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching GiftShopItem'});
    }
});

module.exports = router;