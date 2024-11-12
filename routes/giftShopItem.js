const express = require('express');
const router = express.Router();
const {GiftShopItem, sequelize} = require("../models");
const {QueryTypes} = require("sequelize");


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

// update
router.put('/:id', async (req, res) => {
    const id = req.params.id; // Get the id from the route parameters
    const {
        title,
        description,
        designer,
        origin,
        material,
        dimension,
        price,
        dealPrice,
        costPrice,
        imageUrl,
        stock,
        totalNumberSold,
        categoryID
    } = req.body;

    try {
        // Check if the item exists
        const giftShopItem = await GiftShopItem.findByPk(id);
        if (!giftShopItem) {
            return res.status(404).json({ message: 'GiftShopItem not found' });
        }

        // Update the item with the new data
        await giftShopItem.update({
            title,
            description,
            designer,
            origin,
            material,
            dimension,
            price,
            dealPrice,
            costPrice,
            imageUrl,
            stock,
            totalNumberSold,
            categoryID
        });

        res.json({
            message: 'GiftShopItem updated successfully',
            data: giftShopItem
        });
    } catch (err) {
        console.error('Error updating GiftShopItem:', err);
        res.status(500).json({ message: 'An error occurred while updating the GiftShopItem' });
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

router.post('/filter', async (req, res) => {
    const {
        minPrice,
        maxPrice,
        selectedCategories
    } = req.body;

    let whereClause = `gsi.price >= :minPrice AND gsi.price <= :maxPrice`;

    if (selectedCategories && selectedCategories.length > 0) {
        whereClause += ` AND (gsi.categoryID IN (:selectedCategories))`;
    }

    try {
        const giftShopItems = await sequelize.query(
            `
            SELECT st.customerID AS customerID, gsi.giftShopItemID AS giftShopItemID, gsi.title AS title, gsi.categoryID AS categoryID, gsi.price AS price
            FROM  sale_gift_shop_item AS sgsi
                JOIN gift_shop_item AS gsi ON sgsi.giftShopItemID = gsi.giftShopItemID
                JOIN sale_transaction AS st ON st.saleID = sgsi.saleID
            WHERE ${whereClause}
            `,
            {
                replacements: {
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || 999999999,
                    selectedCategories: selectedCategories.length ? selectedCategories : undefined,
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(giftShopItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching filtered giftShopItems'});
    }
});

router.post('/filter/monthly', async (req, res) => {
    const {
        minPrice,
        maxPrice,
        selectedCategories
    } = req.body;

    let whereClause = `gsi.price >= :minPrice AND gsi.price <= :maxPrice`;

    if (selectedCategories && selectedCategories.length > 0) {
        whereClause += ` AND (gsi.categoryID IN (:selectedCategories))`;
    }

    try {
        const giftShopItemAggregates = await sequelize.query(
            `
            SELECT COUNT(gsi.giftShopItemID) AS giftShopItemCount, SUM(gsi.price) AS totalAmount, MONTH(st.transactionDate) AS period
            FROM  sale_gift_shop_item AS sgsi 
                JOIN gift_shop_item AS gsi ON sgsi.giftShopItemID = gsi.giftShopItemID
                JOIN sale_transaction AS st ON st.saleID = sgsi.saleID
            WHERE ${whereClause}
            GROUP BY MONTH(st.transactionDate)
            `,
            {
                replacements: {
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || 999999999,
                    selectedCategories: selectedCategories.length ? selectedCategories : undefined,
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(giftShopItemAggregates);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching monthly aggregates'});
    }
});

router.post('/filter/quarterly', async (req, res) => {
    const {
        minPrice,
        maxPrice,
        selectedCategories
    } = req.body;

    let whereClause = `gsi.price >= :minPrice AND gsi.price <= :maxPrice`;

    if (selectedCategories && selectedCategories.length > 0) {
        whereClause += ` AND (gsi.categoryID IN (:selectedCategories))`;
    }

    try {
        const giftShopItemAggregates = await sequelize.query(
            `
            SELECT COUNT(gsi.giftShopItemID) AS giftShopItemCount, SUM(gsi.price) AS totalAmount, (MONTH(st.transactionDate) - 1) DIV 3 + 1 AS period
            FROM  sale_gift_shop_item AS sgsi 
                JOIN gift_shop_item AS gsi ON sgsi.giftShopItemID = gsi.giftShopItemID
                JOIN sale_transaction AS st ON st.saleID = sgsi.saleID
            WHERE ${whereClause}
            GROUP BY (MONTH(st.transactionDate) - 1) DIV 3 + 1
            `,
            {
                replacements: {
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || 999999999,
                    selectedCategories: selectedCategories.length ? selectedCategories : undefined,
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(giftShopItemAggregates);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching monthly aggregates'});
    }
});

router.post('/filter/yearly', async (req, res) => {
    const {
        minPrice,
        maxPrice,
        selectedCategories
    } = req.body;

    let whereClause = `gsi.price >= :minPrice AND gsi.price <= :maxPrice`;

    if (selectedCategories && selectedCategories.length > 0) {
        whereClause += ` AND (gsi.categoryID IN (:selectedCategories))`;
    }

    try {
        const giftShopItemAggregates = await sequelize.query(
            `
            SELECT COUNT(gsi.giftShopItemID) AS giftShopItemCount, SUM(gsi.price) AS totalAmount, YEAR(st.transactionDate) AS period
            FROM  sale_gift_shop_item AS sgsi 
                JOIN gift_shop_item AS gsi ON sgsi.giftShopItemID = gsi.giftShopItemID
                JOIN sale_transaction AS st ON st.saleID = sgsi.saleID
            WHERE ${whereClause}
            GROUP BY YEAR(st.transactionDate)
            `,
            {
                replacements: {
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || 999999999,
                    selectedCategories: selectedCategories.length ? selectedCategories : undefined,
                },
                type: QueryTypes.SELECT
            }
        );

        res.json(giftShopItemAggregates);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'An error occurred while fetching monthly aggregates'});
    }
});

module.exports = router;