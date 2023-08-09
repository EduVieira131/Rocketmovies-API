const AppError = require('../utils/app_error')
const knex = require('../database/knex')

class notesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body
    const user_id = req.user.id

    if (rating > 5 || rating < 0) {
      throw new AppError('Rating deve estar entre 0 e 5')
    }

    const [note_id] = await knex('notes').insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex('tags').insert(tagsInsert)

    res.json()
  }

  async index(req, res) {
    const { title, tags } = req.query

    const user_id = req.user.id

    let notes

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag.trim())

      notes = await knex('tags')
        .select(['notes.id', 'notes.title', 'notes.user_id'])
        .where('notes.user_id', user_id)
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filterTags)
        .innerJoin('notes', 'notes.id', 'tags.note_id')
        .orderBy('notes.title')
    } else {
      notes = await knex('notes')
        .where({ user_id })
        .whereLike('title', `%${title}%`)
        .orderBy('title')
    }
    const userTags = await knex('tags').where({ user_id })
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id)

      return {
        ...note,
        tags: noteTags
      }
    })

    return res.json(notesWithTags)
  }

  async show(req, res) {
    const { id } = req.params

    const note = await knex('notes').where({ id }).first()
    const tags = await knex('tags').where({ id }).orderBy('name')

    return res.json({
      ...note,
      tags
    })
  }

  async delete(req, res) {
    const { id } = req.params

    await knex('notes').where({ id }).del()

    return res.json()
  }
}

module.exports = notesController
