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
		required: [true, 'Password is required'],
		select: false
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
	role: {
		type: String,
		enum: ['player', 'captain', 'admin'],
		default: 'player'
	},
	primaryClub: String,
	passwordChangedAt: Date
	// teams: []
})

userSchema.pre('save',async function(next) {
	//run if password was modified
	if(!this.isModified('password')) return next()
	//hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12)
	next()
})

userSchema.methods.passwordsAreMatching = async function(candidatePassword, userPassword){
	return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPaswordAfter = function(JWTTimestamp) {
	if(this.passwordChangedAt) {
		const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10)
		return JWTTimestamp < changedTimestamp
	}
	//False mean not changed
	return false
}

module.exports = mongoose.model('User', userSchema)