const { db, sequelize } = require('../models');
const { childSeed } = require('childseed');
const { parentSeed } = require('parentseed');
const { userSeed } = require('userseed');

const eraseDatabaseOnSync = true;

sequelize
    .sync({ force: eraseDatabaseOnSync })
    .then(() => {
        console.log('Connection has been established successfully');
        db.User.bulkCreate(userSeed)
            .then((data) => {
                console.log(data.length + ' records inserted!');
                process.exit(0);
            })
            .catch((err) => {
                console.error(err);
                process.exit(1);
            });
        db.User.bulkCreate(childSeed)
            .then((data) => {
                console.log(data.length + ' records inserted!');
                process.exit(0);
            })
            .catch((err) => {
                console.error(err);
                process.exit(1);
            });
        db.User.bulkCreate(parentSeed)
            .then((data) => {
                console.log(data.length + ' records inserted!');
                process.exit(0);
            })
            .catch((err) => {
                console.error(err);
                process.exit(1);
            });
    })
    .catch((error) =>
        console.error('Unable to connect to the database:', error)
    );
