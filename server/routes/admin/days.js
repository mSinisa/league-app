const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const Day = require('../../models/Day')
const Division = require('../../models/Division')
const verifyToken = require('../../middleware/checkAuth')
const isAdmin = require('../../middleware/adminCheck')

router.get('/', verifyToken, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, err => { 
        if (err) {
            res.sendStatus(401)
        } else {
            Day.find({}).populate('divisions').exec((err, foundDays) => {
                if (err) {
                    next(err)
                } else {
                    res.status(200).json({
                        days: foundDays
                    })
                }
            })
        }
    })
})

router.get('/divisions', verifyToken, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, err => {
        if(err) {
            res.sendStatus(401)
        }
        Division.find({}).populate('teams').exec((err, allDivisions) => {
            if (err) {
                next(err)
            } else {
                res.status(200).json({
                    allDivisions: allDivisions
                })
            }
        })
    })
})

router.post('/', verifyToken, isAdmin, (req, res, next) => {
    jwt.verify(req.token, process.env.SECRET, err => { 
        if(err) {
            res.sendStatus(401)
        } else {
            let newLeagueDay = { name: req.body.name }
            Day.create(newLeagueDay, (err, createdDay) => {
                if (err) {
                    next(err)
                } else {
                    res.status(201).json({ 
                        newLeagueDay: createdDay,
                        notification: {
                            type: 'success', 
                            message:`Successfuly created new league day ${createdDay.name}`
                        }
                    })
                }
            })
        }
    })
})

router.delete('/:dayId', verifyToken, isAdmin, (req, res, next) => {
    if(req.params.dayId) {
        jwt.verify(req.token, process.env.SECRET, err => { 
            if(err) {
                res.sendStatus(401)
            } else {
                Day.findByIdAndDelete(req.params.dayId, (err, deletedLeagueDay) => {
                    if(err){
                        next(err)
                    } else {
                        res.status(201).json({
                            deletedDay: deletedLeagueDay,
                            notification: {
                                type: 'success',
                                message: `Successfully deleted league day ${deletedLeagueDay.name}`
                            }
                        })
                    }
                })
            }
        })
    }
})

module.exports = router