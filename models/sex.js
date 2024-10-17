'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sex = sequelize.define('Sex', {
    sexCode: {
      type: DataTypes.TINYINT,
      allowNull: false,
      primaryKey: true
    },
    sex: {
      type: DataTypes.STRING(10),
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
    tableName: 'sex',
    timestamps: false
  });

  Sex.associate = function(models) {
    // associations can be defined here
    // For example:
    // Sex.hasMany(models.Person, {
    //   foreignKey: 'sexCode',
    //   as: 'persons'
    // });
  };

  return Sex;
};
