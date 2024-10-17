'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    employeeID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    jobTittle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'JobTitle', // Name of the referenced model
        key: 'jobTitleID' // Key in the referenced model
      }
    },
    salary: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true // Ensure email is unique
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
    },
    department: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Department', // Name of the referenced model
        key: 'departmentID' // Key in the referenced model
      }
    },
    address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address', // Name of the referenced model
        key: 'addressID' // Key in the referenced model
      }
    },
    gender: {
      type: DataTypes.TINYINT,
      allowNull: true,
      references: {
        model: 'Sex', // Name of the referenced model
        key: 'sexCode' // Key in the referenced model
      }
    }
  }, {
    tableName: 'employee',
    timestamps: false
  });

  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.JobTitle, {
      foreignKey: 'jobTittle',
      as: 'job'
    });
    Employee.belongsTo(models.Department, {
      foreignKey: 'department',
      as: 'dept'
    });
    Employee.belongsTo(models.Address, {
      foreignKey: 'address',
      as: 'empAddress'
    });
    Employee.belongsTo(models.Sex, {
      foreignKey: 'gender',
      as: 'empGender'
    });
  };

  return Employee;
};
