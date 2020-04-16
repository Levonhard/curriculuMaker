const connection = require('../database/connection')
const md5 = require('md5')

module.exports = {
    async create(request, response) {
        const { email, pswd } = request.body

        const user = await connection('users')
            .select('*')
            .where('email', email)
            .first()

        if (user) {
            const password = md5(pswd)

            if (password !== user.password) {
                return response.status(401).json({ error: 'Wrong password' })
            }
        } else {
            return response.status(400).json({ error: 'No user found!' })
        }

        return response.json(user)
    }
}