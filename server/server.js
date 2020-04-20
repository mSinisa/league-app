const mongoose = require('mongoose')
const dotenv = require('dotenv')
process.on('uncaughtException', err => {
	console.log('UNCAUGHT EXCEPTION!!! 💥 Shutting Down...')
	console.log(err.name, err.message)
	process.exit(1)
})

dotenv.config({ path: './config.env' })

const app = require('./app')

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(console.log('db connected'))
	.catch(err => {
		console.log(err)
	})

const port = process.env.PORT || 8082
const server = app.listen(port, () => {
	console.log(`app running on port ${port}`)
})

process.on('unhandledRejection', err => {
	console.log('UNHANDELED REJECTION!!! 💥 Shutting Down...')
	console.log(err.name, err.message)
	server.close(() => {
		process.exit(1)
	})
})
