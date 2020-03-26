const express = require('express')
const router = express.Router()
const Day = require('../../models/Day')
const Division = require('../../models/Division')

router.get('/', (req, res, next) => {
    Day.find({}).populate('divisions').exec((err, foundDays) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({
                days: foundDays
            })
        }
    })
})

router.get('/divisions', (req, res, next) => {
    Division.find({}).populate('teams').exec((err, allDivisions) => {
        if (err) {
            next(err)
        } else {
            res.status(200).json({
                allDivisions: allDivisions
            })
        }
    })
})

router.post('/', (req, res, next) => {
        let newLeagueDay = { name: req.body.name }
        Day.create(newLeagueDay, (err, createdDay) => {
            if (err) {
                next(err)
            } else {
                res.status(201).json({ 
                    newLeagueDay: createdDay,
                    notification: {
                        type: 'success', 
                        message:`Successfuly created new league day ${createdDay.name}`
                    }
                })
            }
        })
})

router.delete('/:dayId', (req, res, next) => {
    if(req.params.dayId){
        //find day and populate divisions
        //for each division populate teams
        //delete teams
        //delete divisions
        //delete day
        Day.findByIdAndDelete(req.params.dayId, (err, deletedLeagueDay) => {
            if(err){
                next(err)
            } else {
                res.status(201).json({
                    deletedDay: deletedLeagueDay,
                    notification: {
                        type: 'success',
                        message: `Successfully deleted league day ${deletedLeagueDay.name}`
                    }
                })
            }
        })
    }
    
})

module.exports = router