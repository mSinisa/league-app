const express = require('express')
const router = express.Router({
    mergeParams: true
})
const jwt = require('jsonwebtoken')
const Day = require('../../models/Day')
const Division = require("../../models/Division")
const Team = require('../../models/Team')
const verifyToken = require('../../middleware/checkAuth')
const isAdmin = require('../../middleware/adminCheck')

//NEW
router.post('/', verifyToken, isAdmin, (req, res, next) => {
    if (req.params.dayId) {
        jwt.verify(req.token, process.env.SECRET, err => {
            if (err) {
                res.sendStatus(401)
            } else {
                Day.findById(req.params.dayId).populate('divisions').exec((err, foundDay) => {
                    if (err) {
                        next(err)
                    } else {
                        let newDivison = {
                            name: req.body.name
                        }
                        Division.create(newDivison, (err, createdDivision) => {
                            if (err) {
                                next(err)
                            } else {
                                foundDay.divisions.push(createdDivision)
                                foundDay.save()
                                res.json({
                                    updatedDay: foundDay,
                                    notification: {
                                        message: `Successfully created new division ${createdDivision.name}`,
                                        type: 'success'
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

//DELETE
router.delete('/:divisionId', verifyToken, isAdmin, (req, res, next) => {
    if (req.params.divisionId && req.params.dayId) {
        jwt.verify(req.token, process.env.SECRET, err => {
            if (err) {
                res.sendStatus(401)
            } else {
                //DELETE Division reference from Day
                Day.findById(req.params.dayId).populate('divisions').exec((err, foundDay) => {
                    if (err) {
                        next(err)
                    } else {
                        foundDay.divisions = foundDay.divisions.filter(division => JSON.stringify(division._id) !== JSON.stringify(req.params.divisionId))
                        foundDay.save()
                        //DELETE Division record
                        Division.findByIdAndRemove(req.params.divisionId, (err, deletedDivision) => {
                            if (err) {
                                next(err)
                            } else {
                                res.json({
                                    updatedDay: foundDay,
                                    deletedDivision: deletedDivision,
                                    notification: {
                                        type: 'success',
                                        message: `Successfully deleted division ${deletedDivision.name}`
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

//TRANSFER team between divisions
router.put('/', verifyToken, isAdmin, (req, res, next) => {
    if (req.params.dayId && req.body.currentDivisionId && req.body.teamId && req.body.divisionToTransferToId) {
        jwt.verify(req.token, process.env.SECRET, err => {
            if(err) {
                res.sendStatus(401)
            } else {
                Division.findById(req.body.currentDivisionId, (err, currentTeamDivision) => {
                    if (err) {
                        next(err)
                    } else {
                        currentTeamDivision.teams = currentTeamDivision.teams.filter(team => JSON.stringify(team) !== JSON.stringify(req.body.teamId))
                        currentTeamDivision.save()
                    }
                })
        
                Division.findById(req.body.divisionToTransferToId, (err, divisionToTransferTo) => {
                    if (err) {
                        next(err)
                    } else {
                        divisionToTransferTo.teams.push(req.body.teamId)
                        divisionToTransferTo.save()
                        res.json({
                            notification: {
                                message: `Successfully transfered team`,
                                type: 'success'
                            }
                        })
                    }
                })
            }
        })
    }
})

module.exports = router