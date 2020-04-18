const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/checkAuth')

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
	jwt.verify(req.token, process.env.SECRET, (err) => {
		if (err) {
			res.sendStatus(401)
		} else {
			res.json({
				events: [
					{
						name: 'first',
						id: 1,
					},
					{
						name: 'second',
						id: 2,
					},
					{
						name: 'third',
						id: 3,
					},
				],
			})
		}
	})
})

module.exports = router
