const { Router } = require('express')

const usersRouter = require('./users_routes')
const notesRouter = require('./notes_routes')

const routes = Router()
routes.use("/users", usersRouter)
routes.use("/notes", notesRouter)

module.exports = routes