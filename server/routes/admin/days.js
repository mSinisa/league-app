const express = require('express')
const router = express.Router()
const Day = require('../../models/Day')

router.get('/', (req, res) => {
    Day.find({}, (err, days) => {
        if (err) {
            console.log(err)
        } else {
            res.json({
                days: days
            }).status(200)
        }
    })
})

router.post('/', (req, res) => {
    console.log(req.body)
    let newDay = {
        name: req.body.name,
        description: req.body.description
    }

    Day.create(newDay, (err, createdDay) => {
        if (err) {
            res.json({
                message: `there was an error ${err}`
            })
        } else {
            res.json({
                status: 201,
                message: `Successfuly created new league day ${createdDay}`
            })
        }
    })
})

module.exports = router