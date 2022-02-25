const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const fileUpload = require('express-fileupload')
const fileRouter = require('./routes/file.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const PORT = config.get('serverPort')
const URL = config.get('dbUrl')

const app = express()
app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
	try {
			await mongoose.connect(URL, {
					useNewUrlParser:true,
					useUnifiedTopology:true
			})

			app.listen(PORT, () => {
					console.log('Server started on port ', PORT)
			})
	} catch (e) {
			console.log(e)
	}
}

start()
