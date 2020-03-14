const express = require("express");
const router = express.Router({
    mergeParams: true
});
const Division = require("../../models/Division");
const Team = require("../../models/Team");
const User = require("../../models/User");

//SHOW this one?
router.get("/", (req, res) => {
    // var myId = JSON.parse(req.params.divisionId);
    Division.findById(req.params.divisionId)
        .populate("teams")
        .exec((err, foundDivision) => {
            // Division.findById({
            //     _id: ObjectID(req.params.divisionId)
            // }).populate('teams').exec((err, foundDivision) => {
            console.log(foundDivision);
            if (err) {
                console.log(err);
            } else {
                res.json({
                    teams: foundDivision.teams
                });
            }
        });
});
// router.get('/', (req, res) => {
//     Division.findOne(req.params.divisionId, (err, foundTeam => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(foundTeam)
//         }
//     }))
// })

//NEW TEAM
router.post("/", (req, res) => {
    Division.findById(req.params.divisionId, (err, foundDivision) => {
        if (err) {
            console.log(err);
        } else {
            let newTeam = {
                name: req.body.name,
                description: req.body.description
            };

            Team.create(newTeam, (err, createdTeam) => {
                if (err) {
                    console.log(err);
                } else {
                    foundDivision.teams.push(createdTeam);
                    foundDivision.save();
                    res.json({
                        message: "successfully created new team",
                        status: 201
                    });
                }
            });
        }
    });
});

//SHOW TEAM
router.get("/:teamId", (req, res, next) => {
    Team.findById(req.params.teamId)
        .populate("players")
        .exec((err, foundTeam) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    team: foundTeam
                });
            }
        });
});

module.exports = router;