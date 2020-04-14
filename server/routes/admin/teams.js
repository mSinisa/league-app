const express = require('express')
const router = express.Router({
    mergeParams: true
})
const jwt = require('jsonwebtoken')
const Division = require('../../models/Division')
const Team = require('../../models/Team')
const verifyToken = require('../../middleware/checkAuth')
const isAdmin = require('../../middleware/adminCheck')

//SHOW Team
router.get('/:teamId', verifyToken, (req, res, next) => {
    if (req.params.teamId && req.params.divisionId && req.params.dayId) {
        jwt.verify(req.token, process.env.SECRET, err => {
            if (err) {
                res.sendStatus(401)
            } else {
                Team.findById(req.params.teamId).populate('players').exec((err, foundTeam) => {
                    if (!err) {
                        res.json({
                            team: foundTeam
                        })
                    } else {
                        next(err)
                    }
                })
            }
        })
    }
})
//NEW Team
router.post('/', verifyToken, isAdmin, (req, res, next) => {
    if (req.params.divisionId && req.params.dayId && req.body.name) {
        jwt.verify(req.token, process.env.SECRET, err => {
            if (err) {
                res.sendStatus(401)
            } else {
                Division.findById(req.params.divisionId, (err, foundDivision) => {
                    if (err) {
                        next(err)
                    } else {
                        let newTeam = {
                            name: req.body.name,
                            // description: req.body.description
                        };

                        Team.create(newTeam, (err, createdTeam) => {
                            if (err) {
                                next(err)
                            } else {
                                foundDivision.teams.push(createdTeam)
                                foundDivision.save()
                                res.json({
                                    notification: {
                                        type: 'success',
                                        message: `Successfully created new team ${createdTeam.name}`
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
//Delete Team
router.delete('/:teamId', verifyToken, isAdmin, (req, res, next) => {
    if (req.params.dayId && req.params.divisionId && req.params.teamId) {
        jwt.verify(req.token, process.env.SECRET, err => { 
            if(err) {
                res.sendStatus(401)
            } else {
                Division.findById(req.params.divisionId).populate('teams').exec((err, foundDivision) => {
                    if (err) {
                        next(err)
                    } else {
                        foundDivision.teams = foundDivision.teams.filter(team => JSON.stringify(team._id) !== JSON.stringify(req.params.teamId))
                        foundDivision.save()
        
                        Team.findByIdAndRemove(req.params.teamId, (err, deletedTeam) => {
                            if (err) {
                                next(err)
                            } else {
                                res.json({
                                    notification: {
                                        type: 'success',
                                        message: `Successfully deleted team ${deletedTeam.name}`
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

module.exports = router;