const knex = require('../database/knex')
const AppError = require('../utils/app_error')
const { compare } = require('bcryptjs')
const authConfig = require('../configs/auth')
const { sign } = require('jsonwebtoken')

class sessionsController {
  async create (req, res) {
    const {email, password} = req.body

    const user = await knex("users").where({email}).first()

    if(!user) {
      throw new AppError("E-mail e/ou senha incorreto", 401)
    }

    const validatedPassword = await compare(password, user.password)

    if(!validatedPassword) {
      throw new AppError("E-mail e/ou senha incorreto", 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return  res.json({user, token})
  }
}

module.exports = sessionsController