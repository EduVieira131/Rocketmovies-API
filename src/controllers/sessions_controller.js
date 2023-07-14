const knex = require('../database/knex')
const AppError = require('../utils/app_error')
const { compare } = require('bcryptjs')

class sessionsController {
  async create (req, res) {
    const {email, password} = req.body

    const user = await knex("users").where({email}).first()

    if(!user) {
      throw new AppError("E-mail e/ou senha incorreto", 401)
    }

    const validatedPassword = await  compare(password, user.password)

    if(!validatedPassword) {
      throw new AppError("E-mail e/ou senha incorreto", 401)
    }

    return  res.json(user)
  }
}

module.exports = sessionsController