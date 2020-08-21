const mongoose = require('mongoose');

const User = new mongoose.Schema({
    login: String,
    email: String,
    password: String
});

module.exports = mongoose.model('User', User);