'use strict';
module.exports = (sequelize, DataTypes) => {
    const GiftShopItemColor = sequelize.define('GiftShopItemColor', {
        giftShopItemID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'GiftShopItem', // Assumes the gift shop item model is defined with this name
                key: 'giftShopItemID'
            }
        },
        colorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Color', // Assumes the color model is defined with this name
                key: 'colorID'
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
        tableName: 'gift_shop_item_color',
        timestamps: false,
        indexes: [
            {
                unique: true,
                fields: ['giftShopItemID', 'colorID']
            }
        ]
    });

    GiftShopItemColor.associate = function (models) {
        // Foreign key association with GiftShopItem
        GiftShopItemColor.belongsTo(models.GiftShopItem, {
            foreignKey: 'giftShopItemID',
            as: 'giftShopItem'
        });

        // Foreign key association with Color
        GiftShopItemColor.belongsTo(models.Color, {
            foreignKey: 'colorID',
            as: 'color'
        });
    };

    return GiftShopItemColor;
};
