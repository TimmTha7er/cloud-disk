const Router = require('express').Router
const { body } = require('express-validator')

const userController = require('../controllers/user-controller')

const router = new Router()

router.post(
  '/registration',
  body('email').isEmail().withMessage('введите корректный email'),
  body('password').isLength({ min: 3, max: 10 }).withMessage('пароль должен содержать от 3 до 10 символов'),
  userController.registration
)
router.post(
  '/login',
  body('email').isEmail().withMessage('введите корректный email'),
  body('password').notEmpty().withMessage('введите пароль'),
  userController.login
)
router.post('/logout', userController.logout)

router.get('/activate/:id', userController.activate)
router.get('/refresh', userController.refresh)

module.exports = router
