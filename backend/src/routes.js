const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const UsersController = require('./controllers/UsersController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router()

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required(),
        pswd: Joi.string().required(),
    })
}), SessionController.create)

routes.get('/users', UsersController.index)
routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        username: Joi.string().required(),
        pswd: Joi.string().required().min(5),
    })
}), UsersController.create)
routes.delete('/users/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), UsersController.delete)

module.exports = routes