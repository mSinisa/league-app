const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const currentUser = require('../middleware/currentUser')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const signToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	})
}

exports.register = catchAsync(async (req, res, next) => {
	const {
		email,
		password,
		firstName,
		lastName,
		primaryClub,
		phoneNumber,
	} = req.body

	const newUser = await User.create({
		email,
		password,
		firstName,
		lastName,
		primaryClub,
		phoneNumber,
	})

	const token = signToken(newUser._id)

	currentUser.info = newUser //Save current user for authorization later on

	res.status(201).json({
		status: 'success',
		message: 'Successfuly created user',
		token: token,
		email: newUser.email,
		role: newUser.role,
	})
})

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body

	if (!email || !password) {
		return next(new AppError('Please enter email and password!', 400))
	}

	const user = await User.findOne({ email }).select('+password')

	if (!user || !(await user.passwordsAreMatching(password, user.password))) {
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
		role: user.role,
	})
})

exports.protect = catchAsync(async (req, res, next) => {
	//get the token
	let token
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]
	}

	if (!token) {
		return next(
			new AppError('You are not logged in! Please log in to get access.', 401)
		)
	}
	//verify token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
	//check if user still exists
	const foundUser = await User.findById(decoded.id)
	if (!foundUser) {
		return new AppError('User belonging to this token does not exist!', 401)
	}
	//if user changed passwords after jwt was issued
	if (foundUser.changedPaswordAfter(decoded.iat)) {
		return next(
			new AppError('User recently changed password! Please log in again.', 401)
		)
	}

	//Grant excess to protected route
	req.user = foundUser
	next()
})

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		//roles is an array ['admin, 'captain]
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError('You do not have permission to perform this action!', 403)
			)
		}

		next()
	}
}
