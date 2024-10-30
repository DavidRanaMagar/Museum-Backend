module.exports = function (sequelize, DataTypes) {
    const Exhibition = sequelize.define('Exhibition', {
        exhibitionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        timeSlot: {
            type: DataTypes.TIME,
            allowNull: true
        },
        locationID: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Location', // Reference to the Location model
                key: 'locationID',
            },
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
        tableName: 'exhibition',
        timestamps: true,
    });

    Exhibition.associate = function (models) {
        Exhibition.belongsTo(models.Location, {foreignKey: 'locationID'});
    };
    return Exhibition;
};