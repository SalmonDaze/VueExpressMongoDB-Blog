const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/badapple')

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    create_at: String,
    comment: Number,
    isAdmin: Boolean,
})
let article = new mongoose.Schema({
    title: String,
    content: String,
    create_at: String,
    comment: Array,
    views: Number,
    like: Number,
})
Model = {
        player: mongoose.model('player',userSchema),
        article: mongoose.model('article',article)
}
module.exports = Model