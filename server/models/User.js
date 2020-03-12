const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Role = require('../helpers/role')

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: String,
    teams: [],
    firstName: String,
    lastName: String,
    role: String,
    primaryClub: String
})

module.exports = mongoose.model('User', userSchema)