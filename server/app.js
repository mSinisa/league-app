const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

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

app.all('*', (req, res, next) => {
	next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
