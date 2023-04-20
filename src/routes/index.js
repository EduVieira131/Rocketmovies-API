const { Router } = require('express')

const usersRouter = require('./users_routes')

const routes = Router()
routes.use("/users", usersRouter)

module.exports = routes