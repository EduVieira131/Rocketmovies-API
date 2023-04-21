const AppError = require('../utils/app_error')
const { hash, compare } = require('bcryptjs')
const knex = require('../database/knex')

class usersController {
  async create(req, res) {
    const { name, email, password } = req.body

    const checkUserExists = await knex('users').where({email})

    if (checkUserExists.length > 0) {
      throw new AppError('Esse email já está cadastrado.')
    }

    const hashedPassword = await hash(password, 10)

    await knex('users').insert({ name, email, password: hashedPassword })

    res.status(201).json()
  }

  async update(req, res) {
    const { id } = req.params
    const { name, email, password, old_password } = req.body

    const user = await knex('users').where({ id }).first()

    if (!user) {
      throw new AppError('Usuário não encontrado.')
    }

    const checkNewEmail = await knex('users').where({ email })

    if (!checkNewEmail) {
      throw new AppError('Esse email já esta cadastrado.')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (!old_password && password) {
      throw new AppError(
        'Você precisa informar a senha antiga para atualizá-la'
      )
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.')
      }

      user.password = await hash(password, 10)
    }

    // Need to include update date
    await knex('users').where({ id }).update(user)

    res.status(200).json(user)
  }
}

module.exports = usersController
