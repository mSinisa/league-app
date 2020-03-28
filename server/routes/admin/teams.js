const express = require('express')
const router = express.Router({ mergeParams: true })
const Division = require('../../models/Division')
const Team = require('../../models/Team')

//SHOW 
//SHOW TEAM
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
//NEW TEAM
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
                    foundDivision.teams.push(createdTeam);
                    foundDivision.save();
                    res.json({
                        notification: {
                            type: 'success',
                            message: `Successfully created new team ${createdTeam.name}`
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;