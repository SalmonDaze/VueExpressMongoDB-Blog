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

router.post('/addArticle',(req,res,next)=>{
    let articleInfo = JSON.parse(Object.keys(req.body)[0])
    let title = articleInfo.title
    let content = articleInfo.content
    let category = articleInfo.category
    Model.article.create({
        category:category,
        title:title,
        content:content,
        category:category,
        create_at: getDate(),
        author:{
            name:articleInfo.author.name,
            avatar:articleInfo.author.avatar
        }
    }).then(()=>{
        Model.player.findOne({username:articleInfo.author.name}).then(doc=>{
            console.log(doc)
            doc.articles.push({title:title,content:content,category:category,create_at:create_at})
            doc.save()
        }).catch(e=>{console.log(e)})
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
    }).catch( e =>{
        res.json({
            code:1,
            message:'修改失败！'
        })
    })
})

router.post('/reviseArticle',(req,res,next)=>{
    let article = JSON.parse(Object.keys(req.body)[0])
    console.log(article)
    Model.article.updateOne({_id:article.id},{title:article.title,content:article.content,category:article.category},(err, doc)=>{
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

router.post('/removeArticle',(req,res,next)=>{
    let articleId = JSON.parse(Object.keys(req.body)[0]).id
    Model.article.remove({_id:articleId},(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                code:200,
                message:'文章删除成功'
            })
        }
    })
})

router.post('/getUserList',(req,res,next)=>{
    let params = JSON.parse(Object.keys(req.body)[0])
    Model.player.find({}).sort({_id:-1}).skip(params.page*params.skip).limit(params.limit).then((userList)=>{
        res.json({
            code:200,
            message:'用户查找成功',
            userList:userList
        })
    }).catch(e => {
        console.log(e)
    })
})

router.get('/getUserCount',(req,res,next)=>{
    Model.player.find({}).then((userList)=>{
        res.json({
            code:200,
            message:'用户查找成功',
            length:userList.length
        })
    }).catch(e => {
        console.log(e)
    })
})

router.post('/removeUser',(req,res,next)=>{
    let userID = JSON.parse(Object.keys(req.body)[0]).uid
    Model.player.deleteOne({_id:userID},(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                code:200,
                message:'用户删除成功'
            })
        }
    })
})

router.post('/improvePower',(req,res,next)=>{
    let userID = JSON.parse(Object.keys(req.body)[0]).uid
    Model.player.update({_id:userID},{isAdmin:true},(err,doc)=>{
        if(err){
            console.log(err)
        }else{
        res.json({
            code:200,
            message:'提升成功！'
        })
    }
    })
})

router.get('/getCategory',(req,res,next)=>{
    Model.category.find({}).then((categoryList)=>{
        res.json({
            code:200,
            message:'查找成功',
            data:categoryList
        })
    }).catch( e => {
        console.log(e)
    })
})

router.post('/addCategory',(req,res,next)=>{
    let category = JSON.parse(Object.keys(req.body)[0])
    Model.category.find({}).count().then((length)=>{
        if(length>=10){
            res.json({
                code:1,
                message:'板块数达到最大值'
            })
        }else{
            Model.category.findOne({title:category.title}).then((result)=>{
                if(result){
                    res.json({
                        code:1,
                        message:'板块重名'
                    })
                }else{
                    Model.category.create({title:category.title,create_at:getDate()}).then(()=>{
                        res.json({
                            code:200,
                            message:'创建成功'
                        })
                    })
                }
            })
        }
    })
})

router.post('/deleteCategory',(req,res,next)=>{
    let id = JSON.parse(Object.keys(req.body)[0]).id
    Model.category.deleteOne({_id:id}).then(()=>{
        res.json({
            code:200,
            message:'删除成功'
        })
    })
})


module.exports = router