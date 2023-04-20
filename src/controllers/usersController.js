const knex = require('../database/knex')

class usersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const user = await knex('users').insert({ name, email, password })

    response.status(201).json()
  }
}
