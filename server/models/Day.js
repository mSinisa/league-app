const mongoose = require('mongoose')
Schema = mongoose.Schema

let daySchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    divisions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Division'
    }]
})

module.exports = mongoose.model('Day', daySchema)