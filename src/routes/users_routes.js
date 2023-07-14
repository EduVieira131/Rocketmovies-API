const { Router } = require('express')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRouter = Router()
const UsersController = require('../controllers/users_controller')
const usersController = new UsersController()

usersRouter.post('/', usersController.create)
usersRouter.put('/',ensureAuthenticated ,usersController.update)

module.exports = usersRouter