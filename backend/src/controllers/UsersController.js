const generateUniqueId = require('../utils/generateUniqueId')
const connection = require ('../database/connection')
const md5 = require ('md5')

module.exports = {
    async index (request, response) {
        const users = await connection('users').select('*')

        return response.json(users)
    },

    async create(request, response) {
        const { name, email, username, pswd } = request.body

        const user = await connection('users')
            .select('*')
            .where('email', email)

        if (user.length) {
            return response.status(403).json({ error: 'Forbidden! User already exists.' })
        } else {
            const id = generateUniqueId()

            const password = md5(pswd)

            await connection('users').insert({
                id,
                name,
                email,
                username,
                password,
            })

            return response.json({ id })
        }
    },

    async delete(request, response) {
        const { id } = request.params

        const user = await connection('users')
            .select('*')
            .where('id', id)

        if (user.length) {
            await connection('users').where('id', id).delete()

            return response.status(204).send()
        } else {
            return response.status(404).json({ error: 'Entry not found!' })
        }
    }
}