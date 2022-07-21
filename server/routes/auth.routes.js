const Router = require('express').Router
const { body } = require('express-validator')

const userController = require('../controllers/user-controller')

const router = new Router()

router.post(
  '/registration',
  body('email').isEmail().withMessage('введите корректный email'),
  body('password').isLength({ min: 3, max: 32 }).withMessage('минимальная длина пароля 3 символа'),
  userController.registration
)
router.post(
  '/login',
  body('email').isEmail().withMessage('введите корректный email'),
  userController.login
)
router.post('/logout', userController.logout)

router.get('/activate/:id', userController.activate)
router.get('/refresh', userController.refresh)

module.exports = router
