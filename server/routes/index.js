const express = require('express')
const router = express.Router()
const Model = require('../data/module')

function getDate(){
    let nowDate = new Date()
    let yy = nowDate.getFullYear()
    let mm = nowDate.getMonth()+1
    let dd = nowDate.getDate()
    let hh = nowDate.getHours()
    let min = nowDate.getMinutes()
    return `${yy}年${mm}月${dd}日${hh}时${min}分`
}

router.post('/register',(req,res,next)=>{
    let user = JSON.parse(Object.keys(req.body)[0])
    let username = user.username    
    let password = user.password
    let avatar_key = user.avatar_key
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
                avatar_key:avatar_key
            }).then(()=>{
                res.json({
                    code:200,
                    message:'注册成功！'
                })
            }).catch(e=>{
                console.log(e)
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
            let userInfo = {
                username: username,
                password: password,
                avatar_key:result.avatar_key,
                isAdmin:result.isAdmin,
            }
            let userInfomation = userInfo
            res.cookie('userInfo',userInfomation,{maxAge:6000000})
            res.json({
                code:200,
                message:'登录成功',
                user:userInfomation,
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
    Model.article.find({}).sort({_id:-1}).skip(params.page*params.skip).limit(params.limit).then(articlelist=>{
        article = articlelist
        res.json(article)
    })
})

router.get('/articleCount',(req,res,next)=>{
    Model.article.find({}).then(articleList=>{
        res.json({
            code:200,
            length:articleList.length
        })
    })
})

router.post('/addArticle',(req,res,next)=>{
    let article = JSON.parse(Object.keys(req.body)[0])
    let author = article.author.name || 'Anonymous'
    let category = article.category
    Model.article.create({
        title:article.title,
        content:article.content,
        category:category,
        comment:[],
        like:0,
        views:0,
        author:{
            name:author,
            avatar:article.author.avatar
        },
        create_at:getDate()
    }).then((rres)=>{
        Model.player.findOne({username:article.author.name}).then(doc=>{
            doc.articles.push({title:article.title,content:article.content,category:category,create_at:getDate(),_id:rres._id})
            doc.save()
        }).catch(e=>{console.log(e)})
        res.json({
            code:200,
            message:'文章发布成功'
        })
    })
})

router.post('/getArticleContent',(req,res,next)=>{
    let id = JSON.parse(Object.keys(req.body)[0]).id
    Model.article.findOne({_id:id}).then((article)=>{
        if(!article){
            res.json({
                code:1,
                message:'查找失败'
            })
            return
        }
        res.json({
            code:200,
            message:'查找成功',
            article:article,
        })
    }).catch(e=>{
        console.log(e)
    })
})

router.post('/publishComment',(req,res,next)=>{
    let articleInfo = JSON.parse(Object.keys(req.body)[0])
    let comment = articleInfo.comment
    let id = articleInfo.id
    let username = articleInfo.username
    let avatar = articleInfo.avatar
    let article = articleInfo.article
    let date = getDate()
    Model.article.updateOne({_id:id},{$push:{comment:{username:username,content:comment,date:date,avatar:avatar}}},(err,reuslt)=>{
        if(err){
            console.log(err)
        }else{
            Model.player.findOne({username:username}).then((rdoc)=>{
                let isExsit = false
                rdoc.comments.map( x => {
                    if(x.title === article.title)
                    isExsit = true
                })
                isExsit ? '' : rdoc.comments.push({article:article,_id:id})
                rdoc.save()
            })
            res.json({
                code:200,
                message:'发布成功'
            })
        }
    })
})

router.post('/upvote',(req,res,next)=>{
    let info = JSON.parse(Object.keys(req.body)[0])
    let id = info.id
    let username = info.username
    Model.article.findOne({_id:id}).then((doc)=>{
        doc.like++
        doc.likeList.push(username)
        doc.save()
        res.json({
            code:200,
            message:'点赞成功!'
        })
    })
    
    })

router.post('/downvote',(req,res,next)=>{
    let info = JSON.parse(Object.keys(req.body)[0])
    let id = info.id
    let username = info.username
    Model.article.findOne({_id:id}).then((doc)=>{
            doc.like--
            let index = doc.likeList.indexOf(username)
            doc.likeList.splice(index,1)
            doc.save()
            Model.player.findOne({username:username}).then((rdoc)=>{
                let rindex = rdoc.likes.indexOf(doc)
                rdoc.likes.splice(rindex,1)
                rdoc.save()
            })
            res.json({
                code:200,
                message:'取消成功!'
            })
        })
    })

router.post('/checkvote',(req,res,next)=>{
    let info = JSON.parse(Object.keys(req.body)[0])
    let id = info.id
    let username = info.username
    Model.article.findOne({_id:id}).then((doc)=>{
            res.json({
                code:200,
                message:doc.likeList
            })
        })
    })

router.post('/getUserInformation',(req,res,next)=>{
    let username = JSON.parse(Object.keys(req.body)[0]).username
    Model.player.findOne({username:username}).then((doc)=>{
        res.json({
            code:200,
            message:'查找成功',
            user:doc
        })
    })
})

router.post('/addViews',(req,res,next)=>{
    let id = JSON.parse(Object.keys(req.body)[0]).id
    Model.article.findOne({_id:id}).then((doc)=>{
        doc.views++
        doc.save()
        res.json({
            code:200,
            message:'浏览+1'
        })
    })
})
module.exports = router