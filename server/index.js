require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routes/auth.routes')
const fileUpload = require('express-fileupload')
const fileRouter = require('./routes/file.routes')
const corsMiddleware = require('./middleware/cors.middleware')
const filePathMiddleware = require('./middleware/filepath.middleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(filePathMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const start = async () => {
	try {
			await mongoose.connect(process.env.DB_URL, {
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
