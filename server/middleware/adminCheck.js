const User = require('../models/User')
const currentUser = require('../middleware/currentUser')

module.exports = (req, res, next) => {
    if(currentUser.info){
    User.findOne({email: currentUser.info.email}, (err, foundUser) => {
        if(err) {
            res.send(401)
        } else {
            if(foundUser.isAdmin){
                next()
            } else {
                res.send(401)
            }
        }
    })
    }
}