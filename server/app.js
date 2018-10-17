const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const index = require('./routes/index.js')
const admin = require('./routes/admin.js')
const app = express()
const qn = require('qn')
const fs = require('fs')

let bucket = 'badapple'

let client = qn.create({
    accessKey : 'Sko4Ix3MKmajClJB5ktD-mwe_Vi4XEDD0Wvd1Z0u',
    secretKey : 'VWYc3dhL5N7jthDVcxpZ2H01jIuLjJ0z4XwdhP10',
    bucket : bucket,
    origin : 'http://pgq3wq57e.bkt.clouddn.com'
})

app.post('/upload',(req,res,next)=>{
    console.log(req.body)
    // 构建图片名 这个主要是生成唯一图片名字利于存储 当然为了方便就写时间戳 实际开发可千万别 可能出现两人同一时间
    var fileName = Date.now() + '.png';
    // 构建图片路径 需要在上一层目录下新建一个image
    var filePath = './image/' + fileName;
    // 过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    fs.writeFile(filePath, dataBuffer, function (err) {
        if (err) {
 // 写入失败
            res.end(JSON.stringify({status: '102', msg: '文件写入失败'}));
        } else {

            client.uploadFile(filePath, {key: `/avatar/${fileName}`}, function (err1, result) {
                if (err1) {
                    res.json({
                        status: '1',
                        msg: '上传失败'
                    });
                } else {
                    res.json({
                        status: '0',
                        result: {
                            path: result.url
                        },
                        msg: 'suc'
                    })
                }
                // 上传之后删除本地文件
                fs.unlinkSync(filePath);
            });
        }
    })
})

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/',index)
app.use('/admin',admin)

app.listen('3000',(req,res)=>{
    console.log('服务器运行在localhost:3000......')
})