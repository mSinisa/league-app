const mongoose = require('mongoose')
const Schema = mongoose.Schema

let daySchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'League day is required']
	},
	divisions: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Division'
	}]
})

module.exports = mongoose.model('League', daySchema)