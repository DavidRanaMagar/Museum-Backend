const express = require('express');
const router = express.Router();
const {Sale, sequelize} = require("../models");
const {QueryTypes} = require("sequelize");


// get all
router.get('/', async (req, res) => {
    try {
        const sale = await Sale.findAll();
        res.json(sale);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Sale'});
    }
});

//get by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sale = await Sale.findByPk(id);
        res.json(sale);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching an Sale'});
    }
});

// insert
router.post('/', async (req, res) => {
    try {
        const sale = await Sale.create(req.body);
        res.json(sale);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while creating an Sale'});
    }
});

//delete with id
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id; // Get the id from the route parameters
        const sale = await Sale.findByPk(id);
        if (!sale) {
            return res.status(404).json({message: 'Sale not found'});
        }
        await sale.destroy();
        // Send success response
        res.json({message: `Sale with id ${id} deleted successfully.`});

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Sale'});
    }
});

// retrieve purchase info and items based on customerID
router.get('/:id/items', async (req, res) => {
    const customerID = req.params.id;

    try {
        const artifacts = await sequelize.query(
            `
            SELECT gsi.title AS title, gsi.price AS price, sgsi.quantity AS quantity, st.transactionDate AS transactionDate
            FROM gift_shop_item gsi
                JOIN sale_gift_shop_item sgsi ON gsi.giftShopItemID = sgsi.giftShopItemID
                JOIN sale ON sgsi.saleID = sale.saleID
                JOIN sale_transaction st ON sale.saleID = st.saleID
            WHERE st.customerID = :customerID;
            `,
            {
                replacements: { customerID },
                type: QueryTypes.SELECT
            }
        );

        res.json(artifacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching Exhibition'});
    }
});


module.exports = router;