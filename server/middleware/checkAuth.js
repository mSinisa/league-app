const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        console.log('coming from checkAuth file: ' + req.token)
        next()
    } else {
        res.sendStatus(401)
    }
}