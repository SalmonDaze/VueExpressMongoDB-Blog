module.exports = {
    baseUrl : '/',
    
    devServer : {
        port:8080,
        host:'localhost',
        https:false,
        open:true,
        proxy:{
            '/':{
                target:'http://localhost:3000',
                changeOrigin:true,
                ws:false,
            },
            '/admin':{
                target:'http://localhost:3000/admin',
                changeOrigin:true,
                ws:false,
            }
        }
    }
}