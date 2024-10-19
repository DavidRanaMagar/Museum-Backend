'use strict';
module.exports = (sequelize, DataTypes) => {
    const GiftShopItem = sequelize.define('GiftShopItem', {
        giftShopItemID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        designer: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        origin: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        material: {
            type: DataTypes.STRING(125),
            allowNull: true
        },
        dimension: {
            type: DataTypes.STRING(150),
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        dealPrice: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        costPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        totalNumberSold: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        createdBy: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        },
        updatedBy: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        categoryID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Category', // Assumes the category model is defined with this name
                key: 'categoryID'
            }
        }
    }, {
        tableName: 'gift_shop_item',
        timestamps: false
    });

    GiftShopItem.associate = function (models) {
        // Foreign key association with Category
        GiftShopItem.belongsTo(models.Category, {
            foreignKey: 'categoryID',
            as: 'category'
        });
    };

    return GiftShopItem;
};
