const mongoose = require('mongoose');

const RestfulSchema = new mongoose.Schema({
    name: String,
    title: String,
    description:String,
    completed: Boolean
})
mongoose.model('restful', RestfulSchema);