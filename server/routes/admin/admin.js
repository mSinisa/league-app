const express = require('express')
const router = express.Router()
const User = require('../../models/User')

router.get('/', (req, res) => {
    res.json({message: 'Admin Page'})
})

router.get('/allPlayers', (req, res, next) => {
    User.find({}, (err, allPlayers) => {
        if(err){
            next(err)
        } else {
            res.json({allPlayers: allPlayers})
        }
    })
})

module.exports = router