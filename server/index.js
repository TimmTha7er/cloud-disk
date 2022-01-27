const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
const PORT = config.get('serverPort')
const URL = config.get('dbUrl')

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
