const express = require('express')
const router = express.Router()
const Model = require('../data/module')

router.post('/register',(req,res,next)=>{
    let user = JSON.parse(Object.keys(req.body)[0])
    let username = user.username    
    let password = user.password
    console.log(username)
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
module.exports = router