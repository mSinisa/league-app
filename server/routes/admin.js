const express = require('express')
const router = express.Router()
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')
// const verifyToken = require('../middleware/check-auth')
// const User = require('../models/user')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello from admin page'
    })
})

module.exports = router