const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')

const PORT = config.get('serverPort')
const URL = config.get('dbUrl')

const app = express()
app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
	try {
		await mongoose.connect(URL)
		
		app.listen(PORT, () => {
			console.log('Server started on port', PORT)
		})
	} catch (error) {
		console.log(error)
	}
}

start()
