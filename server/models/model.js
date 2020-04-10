const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String,
    gender: String,
    goal:Number,
    distance: Array,
    totalDist:Number,
})
mongoose.model('user', UserSchema);