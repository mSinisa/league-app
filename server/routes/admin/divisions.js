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
  if (req.params.dayId) {
    Day.findById(req.params.dayId).populate('divisions').exec((err, foundDay) => {
      if (err) {
        console.log(`err found when searching for day: ${err}`);
        res.sendStatus(400)
      } else {
        let newDivison = {
          name: req.body.name
          // division: req.body.division
        };

        Division.create(newDivison, (err, createdDivision) => {
          if (err) {
            res.sendStatus(400)
            //NOT BEING SENT TO THE CLIENT FOR SOME REASON
            // .json({
            //   notification: {
            //     message: `there was an error ${err.message}`,
            //     type: 'error'
            //   }
            // })
          } else {
            foundDay.divisions.push(createdDivision);
            foundDay.save();
            res.json({
              divisions: foundDay.divisions,
              notification: {
                message: "Successfully created new division",
                type: 'success'
              }
            });
          }
        });
      }
    })
  } else {
    res.sendStatus(400)
  }
});

//SHOW
router.get('/:divisionId', (req, res) => {
  Division.findById(req.params.divisionId, (err, foundDivision) => {
    if (err) {
      console.log(err)
    } else {
      console.log(foundDivision)
      res.json({
        division: foundDivision
      })
    }
  })
})

//EDIT
router.put('/:divisionId/edit', (req, res) => {
  if (req.params.divisionId && req.params.dayId) {

  } else {
    res.sendStatus(400)
  }
})

//DELETE
router.delete('/:divisionId', (req, res) => {
  if (req.params.divisionId && req.params.dayId) {
    //DELETE Division reference from Day
    Day.findById(req.params.dayId).populate('divisions').exec((err, foundDay) => {
      if (err) {
        console.log(err)
        res.sendStatus(400)
      } else {
        let updatedDivisions = foundDay.divisions.filter(division => JSON.stringify(division._id) !== JSON.stringify(req.params.divisionId))
        foundDay.divisions = updatedDivisions
        foundDay.save()
        //DELETE Division record
        Division.findByIdAndRemove(req.params.divisionId, (err, deletedDivision) => {
          if (err) {
            console.log(err)
            res.sendStatus(400)
          } else {
            res.json({
              updatedDivisions: foundDay.divisions,
              notification: {
                type: 'success',
                message: 'Successfully deleted division'
              }
            })
          }
        })
      }
    })
  } else {
    res.sendStatus(400)
  }
})

module.exports = router;