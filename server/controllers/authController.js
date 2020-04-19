const jwt = require('jsonwebtoken')
const User = require('../models/User')
const currentUser = require('../middleware/currentUser')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const signToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}

exports.register = catchAsync(async (req, res, next) => {
	const {email, password, firstName, lastName, primaryClub, phoneNumber} = req.body

	const newUser = await User.create({
		email,
		password,
		firstName,
		lastName,
		primaryClub, 
		phoneNumber
	})

	const token = signToken(newUser._id)
	
	currentUser.info = newUser //Save current user for authorization later on

	res.status(201).json({
		status: 'success',
		message: 'Successfuly created user',
		token: token,
		email: newUser.email,
		isAdmin: newUser.isAdmin,
	})
})

exports.login = catchAsync (async (req, res, next) => {
	const { email, password } = req.body

	if(!email || !password) {
		return next(new AppError('Please enter email and password!', 400))
	}

	const user = await User.findOne({ email }).select('+password')

	if(!user || !(await user.passwordsAreMatching(password, user.password))){
		return next(new AppError('Auth failed. Incorrect email or password!', 401))
	}

	const token = signToken(user._id)

	currentUser.info = user //Save current user for authorization later on

	res.status(200).json({
		status: 'success',
		message: 'Auth successful',
		token: token,
		email: user.email,
		firstName: user.firstName,
		isAdmin: user.isAdmin,
	})
})