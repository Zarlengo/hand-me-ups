const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./models');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// Coding to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const passport = require('./config/passport')(db);
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync().then(() => {
    console.log('database is connected');

    // Send every request to the React app
    const routes = require('./routes')(db, passport);
    app.use(routes);

    // Define any API routes before this runs
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });

    app.listen(PORT, () => {
        console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
});
