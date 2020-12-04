module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define('Child', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tags: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
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
