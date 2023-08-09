const { Router } = require('express')
const multer = require("multer")
const uploadConfig = require("../configs/uploads")

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const usersRouter = Router()
const UsersController = require('../controllers/users_controller')
const UserAvatarController = require('../controllers/user_avatar_controller')
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.MULTER)

usersRouter.post('/', usersController.create)
usersRouter.put('/', ensureAuthenticated , usersController.update)
usersRouter.patch("/avatar", ensureAuthenticated, upload.single("avatar"),userAvatarController.update)

module.exports = usersRouter