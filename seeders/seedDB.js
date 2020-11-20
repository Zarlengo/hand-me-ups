module.exports = (db) => {
    const childSeed = require('./childseed');
    const parentSeed = require('./parentseed');
    const userSeed = require('./userseed');

    // const eraseDatabaseOnSync = true;

    db.sequelize
        .sync({ force: true })
        .then(() => {
            console.log('Connection has been established successfully');
            db.User.bulkCreate(userSeed)
                .then((data) => {
                    console.log(data.length + ' records inserted in User!');
                    db.Parent.bulkCreate(parentSeed)
                        .then((data) => {
                            console.log(
                                data.length + ' records inserted in Parent!'
                            );
                            db.Child.bulkCreate(childSeed)
                                .then((data) => {
                                    console.log(
                                        data.length +
                                            ' records inserted in Child!'
                                    );
                                })
                                .catch((err) => {
                                    console.error(err);
                                });
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                })
                .catch((err) => {
                    console.error(err);
                });
        })
        .catch((error) =>
            console.error('Unable to connect to the database:', error)
        );
    return;
};
