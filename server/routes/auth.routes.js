const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Router = require('express')
const User = require('../models/User')
const File = require('../models/File')
const { check, validationResult } = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require('../services/fileService')

const router = new Router()

router.post(
  '/registration',
  [
    check('email', 'Incorrect email').isEmail(),
    check(
      'password',
      'Password must be longer than 3 and shorter than 12'
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Uncorrect request', errors })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with email ${email} already exist` })
      }

      const hashPassword = await bcrypt.hash(password, 7)
      const user = new User({ email, password: hashPassword })

      await user.save()
      await fileService.createDir(req, new File({ user: user.id, name: '' }))

      return res.json({ message: 'User was created' })
    } catch (error) {
      console.log(error)
      res.send({ message: 'Server error' })
    }
  }
)

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPassValid = bcrypt.compareSync(password, user.password)

    if (!isPassValid) {
      return res.status(404).json({ message: 'Invalid password' })
    }

    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' })

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.log(error)
    res.send({ message: 'Server error' })
  }
})

router.get('/auth', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
    const secretKey = process.env.SECRET_KEY
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' })

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    })
  } catch (error) {
    console.log(error)
    res.send({ message: 'Server error' })
  }
})

module.exports = router
