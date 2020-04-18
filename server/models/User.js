const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	phoneNumber: String,
	firstName: { 
		type: String,
		required: [true, 'First name is required']
	},
	lastName: { 
		type: String,
		required: [true, 'Last name is required']
	},
	isAdmin: {
		type: Boolean, 
		default: false 
	},
	primaryClub: String
	// teams: []
})

module.exports = mongoose.model('User', userSchema)