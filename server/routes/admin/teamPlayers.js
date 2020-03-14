const express = require("express");
const router = express.Router({
    mergeParams: true
});
const Team = require("../../models/Team");
const User = require("../../models/User");

router.post("/", (req, res, next) => {
    Team.findById(req.params.teamId).populate("players").exec((err, foundTeam) => {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.body._id, (err, foundPlayer) => {
                if (err) {
                    console.log(err)
                } else {
                    let foundTeamHasfoundPlayer = false
                    //using for loop instead of forEach because it's possible to break out of it
                    for (i = 0; i < foundTeam.players.length; i++) {
                        if (JSON.stringify(foundTeam.players[i]._id) === JSON.stringify(foundPlayer._id)) {
                            foundTeamHasfoundPlayer = true
                            break
                        }
                    }

                    if (foundTeamHasfoundPlayer) {
                        res.status(409)
                            .json({
                                message: "This player is already part of the team"
                            })
                    } else {
                        let clubName;
                        if (foundTeam.name.split(" ").length == 2) {
                            clubName = foundTeam.name.split(" ")[0];
                        } else {
                            let str = foundTeam.name.split(" ");
                            clubName = `${str[0]} ${str[1]}`;
                        }
                        foundPlayer.teams.push(clubName);
                        foundPlayer.save();
                        foundTeam.players.push(foundPlayer);
                        foundTeam.save();

                        res
                            .json({
                                message: "Successfully added player to the team",
                                updatedTeam: foundTeam
                            })
                            .status(200);
                    }
                }
            })
        }
    });

    // Team.findById(req.params.teamId, (err, foundTeam) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(req.body)
    //         User.findById(req.body._id, (err, foundPlayer) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 let hasPlayerId = false;

    //                 foundTeam.players.forEach(player => {
    //                     if (JSON.stringify(player) === JSON.stringify(foundPlayer._id)) {
    //                         hasPlayerId = true;
    //                     }
    //                 });

    //                 if (hasPlayerId) {
    //                     res.status(409)
    //                         .json({
    //                             message: "This player is already part of the team"
    //                         })
    //                 } else {
    //                     let clubName;
    //                     if (foundTeam.name.split(" ").length == 2) {
    //                         clubName = foundTeam.name.split(" ")[0];
    //                     } else {
    //                         let str = foundTeam.name.split(" ");
    //                         clubName = `${str[0]} ${str[1]}`;
    //                     }
    //                     foundPlayer.teams.push(clubName);
    //                     foundPlayer.save();
    //                     foundTeam.players.push(foundPlayer);
    //                     foundTeam.save();

    //                     res
    //                         .json({
    //                             message: "Successfully added player to the team",
    //                             updatedTeam: foundTeam
    //                         })
    //                         .status(200);
    //                 }
    //             }
    //         });
    //     }
    // });
});

module.exports = router;