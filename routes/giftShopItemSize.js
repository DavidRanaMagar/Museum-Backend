const express = require('express');
const router = express.Router();
const {GiftShopItemSize} = require("../models");


// get all
router.get('/', async (req, res) => {
    try {
        const giftShopItemSize = await GiftShopItemSize.findAll();
        res.json(giftShopItemSize);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching GiftShopItemSize'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const giftShopItemSize = await GiftShopItemSize.findByPk(id);
        res.json(giftShopItemSize);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an GiftShopItemSize'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const giftShopItemSize = await GiftShopItemSize.create(req.body);
        res.json(giftShopItemSize);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an GiftShopItemSize'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const giftShopItemSize = await GiftShopItemSize.findByPk(id);
        if (!giftShopItemSize) {
            return res.status(404).json({message: 'GiftShopItemSize not found'});
        }
        await giftShopItemSize.destroy();
        // Send success response
        res.json({message: `GiftShopItemSize with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching GiftShopItemSize'});
    }
});

module.exports = router;