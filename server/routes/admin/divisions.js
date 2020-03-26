const express = require("express")
const router = express.Router({ mergeParams: true })
const Day = require("../../models/Day")
const Division = require("../../models/Division")

//NEW
router.post("/", (req, res, next) => {
    if (req.params.dayId) {
        console.log(req.body)
        Day.findById(req.params.dayId).populate('divisions').exec((err, foundDay) => {
            if (err) {
                next(err)
            } else {
                let newDivison = { name: req.body.name }

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
router.delete('/:divisionId', (req, res, next) => {
    if (req.params.divisionId && req.params.dayId) {
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

module.exports = router;