const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const currentUser = require('../middleware/currentUser')

exports.register = async (req, res) => {
	try {
		const { firstName, lastName, email, password, primaryClub } = req.body

		const user = new User({
			_id: new mongoose.Types.ObjectId(),
			isAdmin: false,
			email,
			password,
			firstName,
			lastName,
			primaryClub,
		})
		//hash password &nsave user to db
		const salt = await bcrypt.genSalt(10)
		user.password = await bcrypt.hash(user.password, salt)
		const savedUser = await user.save()

		const token = jwt.sign({ savedUser }, process.env.SECRET, {
			expiresIn: '1h',
		})
		//Save current user for authorization later on
		currentUser.info = savedUser

		res.status(201).json({
			success: true,
			message: 'Successfuly created user',
			token: token,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} catch (error) {
		if (error.code === 11000) {
			const message = 'Email already exists'
			res.status(409).json({
				success: false,
				message: message,
			})
		}

		if (error.name === 'ValidationError') {
			const messages = Object.values(error.errors).map(val => val.message)
			res.status(400).json({
				success: false,
				message: messages,
			})
		}

		res.status(500).json({
			success: false,
			message: 'Server Error',
		})
	}
}

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body

		if (!email && !password) {
			res.status(400).json({
				success: false,
				message: 'Please enter email and password',
			})
		}

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(401).json({
				success: false,
				message: 'Auth failed. Please enter correct email',
			})
		}

		const match = await bcrypt.compare(password, user.password)
		if (!match) {
			return res.status(401).json({
				message: 'Auth failed. Password Incorrect',
			})
		}

		const token = jwt.sign({ user }, process.env.SECRET, {
			expiresIn: '1h',
		})

		currentUser.info = user
		res.status(200).json({
			success: true,
			message: 'Auth successful',
			token: token,
			email: user.email,
			firstName: user.firstName,
			isAdmin: user.isAdmin,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: 'Server Error',
		})
	}
}
