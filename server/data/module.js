const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/badapple',{useNewUrlParser:true})

let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    create_at: String,
    comment: Number,
    isAdmin: {
        type: Boolean,
        default:false
    },
    avatar_key: {
        type:String,
        default: '',
    },
    likes:{
        type: Schema.Types.ObjectId,
        ref:'article'
    },
    comments:{
        type: Array,
        default:[]
    },
    articles:{
        type: Array,
        default:[]
    }
})
let article = new mongoose.Schema({
    title: String,
    content: String,
    category: String,
    author: {
        name:{
            type: String
        },
        avatar:{
            type: String,
            default: `http://pgq3wq57e.bkt.clouddn.com/default_avatar.jpg`
        }
    },
    create_at: {
        type: String,
        default: Date.now()
    },
    comment: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0,
    },
    like: {
        type: Number,
        default: 0,
    },
    tags:{
        type: Array,
        default:[]
    },
    likeList:{
        type: Array,
        default: []
    }
})
let category = new mongoose.Schema({
    title: String,
    create_at: {
        type: String,
        default: Date.now()
    }
})
let Model = {
        player: mongoose.model('player',userSchema),
        article: mongoose.model('article',article),
        category: mongoose.model('category',category),
}
module.exports = Model