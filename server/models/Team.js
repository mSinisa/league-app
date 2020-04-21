const mongoose = require('mongoose')
const Schema = mongoose.Schema

let teamSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Team name is required']
	},
	players: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
})

module.exports = mongoose.model('Team', teamSchema)