const AppError = require('../utils/app_error')
const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')

class usersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const checkUserExists = await knex('users').where({name})
    
    // if (checkUserExists) {
    //   throw new AppError('Esse email já esta cadastrado.')
    // }

    const hashedPassword = await hash(password, 10)

    await knex('users').insert({ name, email, password: hashedPassword })

    res.status(201).json()
  }
}

module.exports = usersController
