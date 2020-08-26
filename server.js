const express = require('express');
// const app = require('express')();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
// const cookieParse = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const User = require('./User');

const app = express();

const http = require('http').createServer(app);
// const socketio = require('socket.io');
const io = require('socket.io')(http);
require('dotenv').config();

// const server = http.createServer(app);
// const io = socketio(server);

mongoose.connect(process.env.MongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log('MongoDB connection failed!');
    }
    else
        console.log('MongoDB connected...');
});

let second = 1000;
let minute = 1000 * 60;

let cookieLifeTime = 15 * second;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: process.env.Secret,
    resave: true,
    saveUninitialized: true,
    store: new FileStore,
    cookie: {
        maxAge: cookieLifeTime
    }
}))

app.use(passport.initialize());
app.use(passport.session());

require('./passportConfig')(passport);

const PORT = process.env.PORT || 5000;



app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(req.body);
        if (err) throw err;
        if (!user) {
            let data = {
                isAuthenticated: false,
                msg: info
            }
            res.json(data);
        }
        else {
            req.logIn(user, err => {
                if (err) throw err;
                let data = {
                    isAuthenticated: true,
                    msg: 'Successfully Authenticated!!!',
                    expiresIn: cookieLifeTime
                }
                res.json(data);
            });
        }
    })(req, res, next);
});

app.get('/checkAuth', (req, res, next) => {
    if (req.isAuthenticated()) {
        let data = {
            isAuthenticated: true,
            msg: 'Authenticated',
            login: req.user.login,
            expiresIn: cookieLifeTime
        }
        res.json(data);
    }
    else {
        let data = {
            isAuthenticated: false,
            msg: 'Not Authenticated'
        }
        res.json(data);
    }
});

app.post('/register', (req, res) => {
    User.findOne({ login: req.body.login }, (err, user) => {
        if (err) throw err;
        if (user) {
            let data = {
                isAuthenticated: false,
                msg: 'user with this login already exists!!!'
            }
            res.json(data);
        }
        else {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) throw err;
                if (user) {
                    let data = {
                        isAuthenticated: false,
                        msg: 'user with this email already exists!!!'
                    }
                    res.json(data);
                }
                else {
                    let newUser = new User();
                    newUser.login = req.body.login;
                    newUser.email = req.body.email;
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save((err, user) => {
                            if (err) throw err;
                            // req.session.cookie.maxAge = 15 * second;
                            req.logIn(user, err => {
                                if (err) throw err;
                            });

                            let data = {
                                isAuthenticated: true,
                                expiresIn: cookieLifeTime
                            }

                            res.send(data);
                        });
                    });
                }
            });

        }
    });
});

app.post('/logout', (req, res) => {
    if (req.isAuthenticated())
        req.session.cookie.maxAge = 0;
    res.json({ msg: 'OK' });
});



require('./socketsConfig')(io);
// io.on('connection', socket => {
//     console.log('user entered the chat!');

//     socket.on('join', (data) => {
//         console.log(`User ${data.user} joined the room '${data.room}'`);

//         socket.emit('controlMessage', { user: 'control', text: `Welcome to the club, ${data.user}` });

//         socket.broadcast.to(data.room).emit('controlMessage', { user: 'control', text: `${data.user} joined the club!` });

//         socket.join(data.room);

//     });

//     socket.on('message', (message) => {
//         socket.broadcast.to(message.room).emit('message', { user: message.user, text: message.text });
//         // io.to(message.room).emit('message', { user: message.user, text: message.text });
//         console.log(message);
//     });

//     socket.on('disconnect', () => {
//         console.log('user left the chat!');
//     })
// });

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});