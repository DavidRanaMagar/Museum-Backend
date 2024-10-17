'use strict';
module.exports = (sequelize, DataTypes) => {
  const GiftShopItemSize = sequelize.define('GiftShopItemSize', {
    giftShopItemID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'gift_shop_item',
        key: 'giftShopItemID'
      }
    },
    sizeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'size',
        key: 'sizeID'
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
    tableName: 'gift_shop_item_size',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['giftShopItemID', 'sizeID']
      }
    ]
  });

  GiftShopItemSize.associate = function(models) {
    // associations can be defined here
    GiftShopItemSize.belongsTo(models.GiftShopItem, {
      foreignKey: 'giftShopItemID',
      as: 'giftShopItem'
    });
    GiftShopItemSize.belongsTo(models.Size, {
      foreignKey: 'sizeID',
      as: 'size'
    });
  };

  return GiftShopItemSize;
};
