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

router.post('/getArticle',(req,res,next)=>{
    let _id = JSON.parse(Object.keys(req.body)[0]).id
    Model.article.find({_id:_id}).then(resarticle=>{
        res.json({
            article:resarticle,
            code:200,
            message:'查找成功'
        })
    }).catch(e=>{
        res.json({
            code:1,
            message:'修改失败！'
        })
    })
})

router.post('/reviseArticle',(req,res,next)=>{
    let article = JSON.parse(Object.keys(req.body)[0])
    console.log(article)
    Model.article.updateOne({_id:article.id},{title:article.title,content:article.content},(err, doc)=>{
        if(err){
            console.log(err)
            return
        }else{
            let response = {
                code:200,
                message:'修改成功',
                data:doc
            }
            res.json(response)
        }
    })
})
module.exports = router