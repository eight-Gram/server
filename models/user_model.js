const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
}, {
    timestamps: true
});

let user = mongoose.model('user', userSchema);

module.exports = user;
