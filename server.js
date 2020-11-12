const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

const { db, sequelize } = require('./models');

sequelize.sync().then(() => {
    console.log('database is connected');

    // Send every request to the React app
    const routes = require('./routes')(db, sequelize);
    app.use(routes);

    // Define any API routes before this runs
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });

    app.listen(PORT, () => {
        console.log(`🌎 ==> API server now on port ${PORT}!`);
    });
});
