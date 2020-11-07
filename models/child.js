module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('Child', {
        parentUserName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        receiveToys: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        receiveClothes: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        receiveFurniture: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        donateToys: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        donateClothes: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        donateFurniture: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });

    Child.associate = function (models) {
        Child.belongsTo(models.Parent, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Child;
};
