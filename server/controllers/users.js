require('../models/model')

const mongoose = require('mongoose'),
    user = mongoose.model("user");

    module.exports = {

        index: function (request, response) {
            user.find().sort("-totalDist")
                .then(users => response.json({ results: users }))
                .catch(err => response.json({ error: err.error }))
        },
        indexwalk: function (request, response) {
            user.find({runnerType: "power walker"}).sort("-totalDist")
                .then(users => response.json({ results: users }))
                .catch(err => response.json({ error: err.error }))
        },
        indexrun: function (request, response) {
            console.log("++++++++++++++++++++++++++")

            user.find({runnerType:"runner"}).sort("-totalDist")
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
        // update: function (request, response) {
        //     user.updateOne({email: request.params.email },{ $push:{ distance: "test"}})
        //     // // finance.updateOne({_id:request.params.id}, request.body)
        //     // // user.updateOne({email:request.params.id},{ $push: { friends: friend } request.body)
        //         .then(result =>  response.json({ results: result }))
        //         .catch(err => response.json({ error: err.error }))
        // }
        update: function (request, response) {
            user.updateOne({_id:request.body._id}, request.body)
                .then(result => response.json({ results: result }))
                .catch(err => response.json({ error: err.error }))
        }
    };