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
            Model.player.create({
                username:username,
                password:password
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
    Model.player.findOne({username:username,password:password}).then((result)=>{
        if(!result){
            res.json({
                code:1,
                message:'用户名或者密码错误'
            })
        }else{
            res.json({
                code:200,
                message:'登录成功'
            })
        }
    })
})
module.exports = router