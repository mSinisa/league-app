const mongoose = require('mongoose')
const Schema = mongoose.Schema

let divisionSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    // description: String,
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    }]
})

module.exports = mongoose.model('Division', divisionSchema)