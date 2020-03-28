const express = require('express')
const router = express.Router({ mergeParams: true })
const Division = require('../../models/Division')
const Team = require('../../models/Team')

//SHOW Team
router.get("/:teamId", (req, res, next) => {
    if(req.params.teamId && req.params.divisionId && req.params.dayId) {
        Team.findById(req.params.teamId).populate("players").exec((err, foundTeam) => {
            if (!err) {
                res.json({ team: foundTeam })
            } else {
                next(err)
            }
        })
    }
})
//NEW Team
router.post("/", (req, res, next) => {
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
})
//Delete Team
router.delete('/:teamId', (req, res, next) => {
    if(req.params.dayId && req.params.divisionId && req.params.teamId) {
       Division.findById(req.params.divisionId).populate('teams').exec((err, foundDivision) => {
           if(err){
               next(err)
           } else {
               foundDivision.teams = foundDivision.teams.filter(team => JSON.stringify(team._id) !== JSON.stringify(req.params.teamId))
               foundDivision.save()

               Team.findByIdAndRemove(req.params.teamId, (err, deletedTeam) => {
                    if(err) {
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

module.exports = router;