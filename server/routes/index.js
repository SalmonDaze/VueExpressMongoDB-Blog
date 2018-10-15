const express = require('express')
const router = express.Router()
const Model = require('../data/module')

router.post('/register',(req,res,next)=>{
    let user = JSON.parse(Object.keys(req.body)[0])
    let username = user.username    
    let password = user.password
    if(username == '' || password == ''){
        res.json({
            code:1,
            message:'用户名或者密码不应为空'
        })
        return
    }
    Model.player.findOne({username:username}).then((userInfo)=>{
        if(userInfo){
            res.json({
                code:1,
                message:'用户名已被注册！'
            })
            return  
        }else{
            let createDate = new Date()
            let createYear = createDate.getFullYear()
            let createMonth = createDate.getMonth()
            let createDay = createDate.getDate()
            Model.player.create({
                username:username,
                password:password,
                create_at:`${createYear}${createMonth+1}${createDay}`,
                comment:0,
                isAdmin:false,
            }).then(()=>{
                res.json({
                    code:200,
                    message:'注册成功！'
                })
            })
        }
    })
})

router.post('/login',(req,res,next)=>{
    let user = JSON.parse(Object.keys(req.body)[0])
    let username = user.username
    let password = user.password
    let userInfo = {
        username: username,
        password: password,
    }
    Model.player.findOne({username:username,password:password}).then((result)=>{
        if(!result){
            res.json({
                code:1,
                message:'用户名或者密码错误'
            })
        }else{
            let userInfomation = result
            res.cookie('userInfo',userInfomation,{maxAge:6000000})
            res.json({
                code:200,
                message:'登录成功'
            })
        }
    })
})
router.get('/checkLogin',(req,res,next)=>{
    if(req.cookies.userInfo){
        res.json({
            code:200,
            message:req.cookies.userInfo
        })
    }else{
        res.json({
            code:1,
            message:'Not login'
        })
    }
})

router.post('/logout',(req,res,next)=>{
    res.clearCookie('userInfo')
    res.json({
        code:200,
        message:'登出成功'
    })
})

router.post('/getArticle',(req,res,next)=>{
    let params = JSON.parse(Object.keys(req.body)[0])
    console.log(params)
    Model.article.find({}).then(articlelist=>{
        article = articlelist
        res.json(article)
    })
})

router.post('/addArticle',(req,res,next)=>{
    let article = JSON.parse(Object.keys(req.body)[0])
    let author = article.author || 'anonymous'
    Model.article.create({
        title:article.title,
        content:article.content,
        comment:[],
        like:0,
        views:0,
        author:author,
    }).then(()=>{
        res.json({
            code:200,
            message:'文章发布成功'
        })
    })
})
module.exports = router