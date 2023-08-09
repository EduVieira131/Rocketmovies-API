const { Router } = require('express')

const ensureAuthenticated = require('../middleware/ensureAuthenticated')

const notesRoutes = Router()
const NotesController = require('../controllers/notes_controller')
const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)

notesRoutes.get('/', notesController.index)
notesRoutes.post('/',ensureAuthenticated, notesController.create)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)

module.exports = notesRoutes