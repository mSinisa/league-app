const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin/admin')
const dayRoutes = require('./routes/admin/days')
const divisionRoutes = require('./routes/admin/divisions')
const teamRoutes = require('./routes/admin/teams')
const teamPlayerRoutes = require('./routes/admin/teamPlayers')

const app = express()

app.use(bodyParser.json())
app.use(cors())

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log('db connected'))
	.catch((err) => {
		console.log(err)
	})

//ROUTES
app.use(authRoutes)
app.use(userRoutes)
app.use('/admin', adminRoutes)
app.use('/admin/days', dayRoutes)
app.use('/admin/days/:dayId/divisions', divisionRoutes)
app.use('/admin/days/:dayId/divisions/:divisionId/teams', teamRoutes)
app.use(
	'/admin/days/:dayId/divisions/:divisionId/teams/:teamId/teamPlayers',
	teamPlayerRoutes
)

app.use((req, res) => {
	res.status(404).json({ error: { message: 'Page not found' } })
})

// handle errors
// app.use((error, req, res, next) => {
// 	res.status(error.status || 500).json({
// 		error: { message: error.message || 'Oops!! Something went wrong.' },
// 	})
// })
//SERVER
const port = 8082
app.listen(port, () => {
	console.log(`app listening on port ${port}`)
})
