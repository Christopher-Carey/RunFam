require('../models/model')

const mongoose = require('mongoose'),
    restful = mongoose.model("restful");

    module.exports = {

        index: function (request, response) {
            restful.find()
                .then(restfuls => response.json({ results: restfuls }))
                .catch(err => response.json({ error: err.error }))
        },
        show: function (request, response) {
            restful.findOne({ _id: request.params.id })
                .then(restful => response.json({ results: restful }))
                .catch(err => response.json({ error: err.error }))
        },
        create: function (request, response) {
            restful.create(request.body)
                .then(restful => response.json({ results: restful }))
                .catch(err => response.json({ error: err.error }))
        },
        destroy: function (request, response) {
            restful.remove({ _id: request.params.id })
                .then(restful => response.json({ results: restful }))
                .catch(err => response.json({ error: err.error }))
        },
        update: function (request, response) {
            console.log(request.body)
            restful.updateOne({_id:request.params.id}, request.body)
                .then(result =>  response.json({ results: result }))
                .catch(err => response.json({ error: err.error }))
        }
    };