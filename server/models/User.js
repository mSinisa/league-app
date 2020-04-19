const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

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

userSchema.pre('save',async function(next) {
	if(!this.isModified('password')) return next()

	this.password =await bcrypt.hash(this.password, 12)
})

module.exports = mongoose.model('User', userSchema)