const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
// const cookieParse = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const User = require('./User');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.MongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) throw err;
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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});