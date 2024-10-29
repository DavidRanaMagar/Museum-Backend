'use strict';
module.exports = (sequelize, DataTypes) => {
    const SaleGiftShopItem = sequelize.define('SaleGiftShopItem', {
        saleID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'Sale', // Name of the referenced model
                key: 'saleID'  // Key in the referenced model
            }
        },
        giftShopItemID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'GiftShopItem', // Name of the referenced model
                key: 'giftShopItemID'  // Key in the referenced model
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        createdBy: {
            type: DataTypes.STRING(25),
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        },
        updatedBy: {
            type: DataTypes.STRING(25),
            allowNull: true
        }
    }, {
        tableName: 'sale_gift_shop_item',
        timestamps: false
    });

    SaleGiftShopItem.associate = function (models) {
        // associations can be defined here
        SaleGiftShopItem.belongsTo(models.Sale, {
            foreignKey: 'saleID',
            as: 'sale'
        });
        SaleGiftShopItem.belongsTo(models.GiftShopItem, {
            foreignKey: 'giftShopItemID',
            as: 'giftShopItem'
        });
    };

    return SaleGiftShopItem;
};
