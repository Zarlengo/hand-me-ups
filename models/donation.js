module.exports = (sequelize, DataTypes) => {
    const tokens = require('../config/tokens');
    const Donation = sequelize.define('Donation', {
        sendingParentID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recievingChildID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        trackingNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    Donation.addHook('beforeCreate', (donation) => {
        donation.trackingNumber = tokens.create({
            passLength: 21,
            upper: true,
            lower: false,
            numbers: true,
            special: false,
        });
    });

    return Donation;
};
