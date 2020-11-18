module.exports = (sequelize, DataTypes) => {
    const Parent = sequelize.define('Parent', {
        address1: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Parent.associate = function (models) {
        Parent.hasMany(models.Child, {
            onDelete: 'cascade',
        });
    };

    Parent.associate = function (models) {
        Parent.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Parent;
};
