require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const router = require('./routes')
const fileUpload = require('express-fileupload')
const filePathMiddleware = require('./middleware/filepath.middleware')
const errorMiddleware = require('./middleware/error.middleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(fileUpload({}))
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    optionSuccessStatus: 200,
  })
)
app.use(filePathMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use(express.static('static'))
app.use('/api/auth', router.authRouter)
app.use('/api/files', router.fileRouter)
app.use(errorMiddleware()) // should be last

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT)
    })
  } catch (error) {
    console.error(error)
  }
}

start()
