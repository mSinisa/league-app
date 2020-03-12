const express = require('express')
const router = express.Router()
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')
// const verifyToken = require('../middleware/check-auth')
const User = require('../../models/User')

// router.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'hello from admin page'
//     })
// })
router.get('/', (req, res) => {
    User.find({}, (err, foundUsers) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                allPlayers: foundUsers
            })
        }
    })
})

module.exports = router