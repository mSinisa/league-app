const express = require('express')
const router = express.Router({ mergeParams: true })
const Team = require('../../models/Team')
const User = require('../../models/User')
const verifyToken = require('../../middleware/checkAuth')
const isAdmin = require('../../middleware/adminCheck')

router.post('/', verifyToken, isAdmin, (req, res, next) => {
    if(req.params.dayId && req.params.divisionId && req.params.teamId && req.body.playerId) {
        Team.findById(req.params.teamId).populate('players').exec((err, foundTeam) => {
            if (err) {
                next(err)
            } else {
                User.findById(req.body.playerId, (err, foundPlayer) => {
                    if (err) {
                        next(err)
                    } else {
                        let foundTeamHasfoundPlayer = false
                        for (i = 0; i < foundTeam.players.length; i++) {
                            if (JSON.stringify(foundTeam.players[i]._id) === JSON.stringify(foundPlayer._id)) {
                                foundTeamHasfoundPlayer = true
                                break
                            }
                        }
    
                        if (foundTeamHasfoundPlayer) {
                            res.status(409).json({
                                    notification: { 
                                        message: 'This player is already on the team', 
                                        type: 'error'
                                    }, 
                                })
                        } else {
                            foundTeam.players.push(foundPlayer);
                            foundTeam.save();
    
                            res.json({ 
                                notification: { 
                                    message: 'Successfully added player to the team', 
                                    type: 'success'
                                },
                                updatedTeam: foundTeam
                            })
                        }
                    }
                })
            }
        })
    }
})

router.delete('/:playerId', verifyToken, isAdmin, (req, res, next) => {
    if(req.params.dayId && req.params.divisionId && req.params.teamId && req.params.playerId) {
        Team.findById(req.params.teamId).populate('players').exec((err, foundTeam) => {
            if (err) {
                next(err)
            } else {
                foundTeam.players = foundTeam.players.filter(player => JSON.stringify(player._id) !== JSON.stringify(req.params.playerId))
                foundTeam.save()
                res.json({
                    updatedTeam: foundTeam,
                    notification: { 
                        message: 'Successfully removed player from the team', 
                        type: 'success'
                    }
                })
            }
        })
    }
})

module.exports = router