'use strict';
module.exports = (sequelize, DataTypes) => {
  const Membership = sequelize.define('Membership', {
    membershipID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    customerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer', // Name of the referenced model
        key: 'customerID'  // Key in the referenced model
      }
    },
    membershipType: {
      type: DataTypes.TINYINT,
      allowNull: false,
      references: {
        model: 'MembershipType', // Name of the referenced model
        key: 'membershipTypeCode' // Key in the referenced model
      }
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    renewalDate: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'membership',
    timestamps: false
  });

  Membership.associate = function(models) {
    // associations can be defined here
    Membership.belongsTo(models.Customer, {
      foreignKey: 'customerID',
      as: 'customer'
    });
    Membership.belongsTo(models.MembershipType, {
      foreignKey: 'membershipType',
      as: 'membershipType'
    });
  };

  return Membership;
};
