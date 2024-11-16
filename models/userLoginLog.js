module.exports = (sequelize, DataTypes) => {
    const UserLoginLog = sequelize.define('UserLoginLog', {
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'User',
                key: 'userID',
            },
        },
        loginTime: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'user_login_log',
        timestamps: false, // Disable automatic createdAt and updatedAt fields
    });

    UserLoginLog.associate = function (models) {
        UserLoginLog.belongsTo(models.User, {
            foreignKey: 'userID',
            targetKey: 'userID',
        });
    };

    return UserLoginLog;
};