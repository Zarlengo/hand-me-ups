const express = require('express');
const session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

const db = require('./models');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    // Config variable in Heroku to force seeding the database
    if (process.env.seedHeroku) {
        require('./seeders/seedDB')(db);
    }
} else {
    require('dotenv').config();
}

// Coding to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const passport = require('./config/passport')(db);
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

// Initializes passport
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync().then(() => {
    console.log('database is connected');

    // Send every request to the React app
    app.use(require('./routes')(db, passport));

    // Define any API routes before this runs
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, './client/build/index.html'));
    });

    const server = require('http').createServer(app);
    const io = require('socket.io')(server, {
        cors: {
            methods: ['GET', 'POST'],
            allowedHeaders: ['x-access-token'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        // Send user id from client -> Current logged on members table

        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id);
        });

        socket.on('typing', (data) => {
            console.log(data);
            socket.broadcast.emit('typing', data);
        });

        socket.on('chat', (data) => {
            io.sockets.emit('chat', data);
        });
    });

    server.listen(PORT, () => {
        console.log(`Socket is listening on port ${PORT}!`);
    });
});
