const mongoose = require('mongoose')
Schema = mongoose.Schema

let teamSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Team', teamSchema)