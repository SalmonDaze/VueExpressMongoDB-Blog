const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/badapple')

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    create_at: String,
    comment: Number,
})
Model = {
        player: mongoose.model('player',userSchema)
}
module.exports = Model