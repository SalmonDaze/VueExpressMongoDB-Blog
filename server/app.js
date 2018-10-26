const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const index = require('./routes/index.js')
const admin = require('./routes/admin.js')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io').listen(server)

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

io.on('connection',function(socket){
    console.log('a user connected')
})
app.use('/',index)
app.use('/admin',admin)

server.listen('3000',(req,res)=>{
    console.log('服务器运行在localhost:3000......')
})