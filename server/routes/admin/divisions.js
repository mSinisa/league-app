const express = require("express");
const router = express.Router({
  mergeParams: true
});
const Day = require("../../models/Day");
const Division = require("../../models/Division");

router.get("/", (req, res) => {
  Day.findById(req.params.dayId)
    .populate("divisions")
    .exec((err, foundDay) => {
      if (err) {
        console.log(err);
      } else {
        res.json({
          divisions: foundDay.divisions
        });
      }
    });
});

//NEW
router.post("/", (req, res) => {
  Day.findById(req.params.dayId, (err, foundDay) => {
    if (err) {
      console.log(`err found when searching for day: ${err}`);
    } else {
      let newDivison = {
        name: req.body.name,
        division: req.body.division
      };

      Division.create(newDivison, (err, createdDivision) => {
        if (err) {
          res.json({
            message: `there was an error ${err}`
          });
        } else {
          foundDay.divisions.push(createdDivision);
          foundDay.save();
          res.json({
            message: "successfully created new division",
            // status: 201
          });
        }
      });
    }
  });
});

module.exports = router;