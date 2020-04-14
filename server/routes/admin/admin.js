const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const verifyToken = require('../../middleware/checkAuth')

router.get('/', (req, res) => {
    res.json({ message: 'Admin Page' })
})

router.get('/allPlayers', verifyToken, (req, res, next) => {
    User.find({ isAdmin: false }, (err, allPlayers) => {
        if(err){
            next(err)
        } else {
            res.json({ allPlayers: allPlayers })
        }
    })
})

module.exports = router