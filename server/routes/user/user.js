const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const verifyToken = require('../../middleware/checkAuth')
const User = require('../../models/User')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello from home page'
    })
})

router.post('/register', (req, res) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Please try registering with another email'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hashedPassword
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                const token = jwt.sign({
                                    user
                                }, 'the_secret_key')
                                res.status(201).json({
                                    message: 'Successfuly created user',
                                    token: token,
                                    email: user.email
                                })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.post('/login', (req, res) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                // result == true
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        'the_secret_key', {
                            expiresIn: '1h'
                        }
                    )
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token,
                        email: user[0].email,
                        firstName: user[0].firstName
                    })
                }
                return res.status(401).json({
                    message: 'Auth failed'
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

// router.delete('/users/:userId', (req, res) => {
//     User.remove({
//             _id: req.params.userId
//         })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: 'User deleted'
//             })
//         })
//         .catch(err => {
//             console.log(err)
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

router.get('/about', verifyToken, (req, res) => {
    jwt.verify(req.token, 'the_secret_key', err => {
        if (err) {
            res.sendStatus(401)
        } else {
            res.json({
                events: [{
                    name: 'first',
                    id: 1
                }, {
                    name: 'second',
                    id: 2
                }, {
                    name: 'third',
                    id: 3
                }]
            }).status(200)
        }
    })
})

module.exports = router