require('../models/model')

const mongoose = require('mongoose'),
    user = mongoose.model("user");

    module.exports = {

        index: function (request, response) {
            user.find()
                .then(users => response.json({ results: users }))
                .catch(err => response.json({ error: err.error }))
        },
        show: function (request, response) {
            user.findOne({email: request.params.id })
                .then(user => response.json({ results: user }))
                .catch(err => response.json({ error: err.error }))
        },
        create: function (request, response) {
            user.create(request.body)
                .then(user => response.json({ results: user }))
                .catch(err => response.json({ error: err.error }))
        },
        destroy: function (request, response) {
            user.remove({ _id: request.params.id })
                .then(user => response.json({ results: user }))
                .catch(err => response.json({ error: err.error }))
        },
        update: function (request, response) {
            console.log(request.body)
            user.updateOne({_id:request.params.id}, request.body)
                .then(result =>  response.json({ results: result }))
                .catch(err => response.json({ error: err.error }))
        }
    };