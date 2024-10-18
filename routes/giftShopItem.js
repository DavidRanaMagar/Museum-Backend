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
router.get('/:id ', async (req, res) => {
    try {
        const id = req.params.id;
        const department = await Department.findByPk(id);
        res.json(department);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Department'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.json(department);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Department'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const department = await Department.findByPk(id);
        if (!department) {
            return res.status(404).json({message: 'Department not found'});
        }
        await department.destroy();
        // Send success response
        res.json({message: `Department with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Department'});
    }
});

module.exports = router;