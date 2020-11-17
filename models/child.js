module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('Child', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        receiveToys: {
            type: DataTypes.BOOLEAN,
        },
        receiveClothes: {
            type: DataTypes.BOOLEAN,
        },
        receiveFurniture: {
            type: DataTypes.BOOLEAN,
        },
        donateToys: {
            type: DataTypes.BOOLEAN,
        },
        donateClothes: {
            type: DataTypes.BOOLEAN,
        },
        donateFurniture: {
            type: DataTypes.BOOLEAN,
        },
        toysDonated: {
            type: DataTypes.INTEGER,
        },
        clothesDonated: {
            type: DataTypes.INTEGER,
        },
        furnitureDonated: {
            type: DataTypes.INTEGER,
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
