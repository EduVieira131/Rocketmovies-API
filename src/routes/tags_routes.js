const { Router } = require('express')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const tagsRouter = Router()
const TagsController = require('../controllers/tags_controller')
const tagsController = new TagsController()

tagsRouter.get('/',ensureAuthenticated, tagsController.index)


module.exports =tagsRouter