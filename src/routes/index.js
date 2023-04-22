const { Router } = require('express')

const usersRouter = require('./users_routes')
const notesRouter = require('./notes_routes')
const tagsRouter = require('./tags_routes')

const routes = Router()
routes.use("/users", usersRouter)
routes.use("/notes", notesRouter)
routes.use("/tags", tagsRouter)

module.exports = routes