'use strict';
module.exports = (sequelize, DataTypes) => {
  const MembershipType = sequelize.define('MembershipType', {
    membershipTypeCode: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    membershipType: {
      type: DataTypes.STRING(25),
      allowNull: false
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
    tableName: 'membership_type',
    timestamps: false
  });

  MembershipType.associate = function(models) {
    // associations can be defined here
    // For example:
    // MembershipType.hasMany(models.Member, {
    //   foreignKey: 'membershipTypeCode',
    //   as: 'members'
    // });
  };

  return MembershipType;
};
