const express = require('express')
const router = express.Router()
const Model = require('../data/module')

function getDate(){
    let nowDate = new Date()
    let yy = nowDate.getFullYear()
    let mm = nowDate.getMonth()
    let dd = nowDate.getDate()
    let hh = nowDate.getHours()
    let min = nowDate.getMinutes()
    return `${yy}年${mm}月${dd}日${hh}时${min}分`
}

router.post('/addArticle',(req,res,next)=>{
    let articleInfo = JSON.parse(Object.keys(req.body)[0])
    let title = articleInfo.title
    let content = articleInfo.content
    Model.article.create({
        title:title,
        content:content,
        create_at: getDate(),
    }).then(()=>{
        res.json({
            code:200,
            message:'文章添加成功'
        })
    })
})
module.exports = router