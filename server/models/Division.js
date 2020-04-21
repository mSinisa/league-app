const mongoose = require('mongoose')
const Schema = mongoose.Schema

let divisionSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Division name is required']
	},
	teams: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team'
	}]
})

module.exports = mongoose.model('Division', divisionSchema)