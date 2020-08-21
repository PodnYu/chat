const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./User');

module.exports = function (passport) {
    passport.use(new localStrategy({
        usernameField: 'login',
        passwordField: 'password'
    }, (login, password, done) => {
        User.findOne({ login }, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, 'Wrong login/password');
            }
            else {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (err) throw err;
                    if (success) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false, 'Wrong login/password');
                    }
                });
            }
        });
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            cb(err, user);
        });
    });

}