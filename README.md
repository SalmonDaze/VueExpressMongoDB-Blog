### 前言

此项目为本人出于兴趣，第一次全栈式开发的项目。有部分地方功能的实现不是很完善，但可以为初次接触全栈式开发的朋友提供一些帮助。此项目已部署到阿里云服务器

### 技术栈

前端: HTML + CSS + SASS(SCSS) + Vue2 + Vue-Cli 3.0 + Vue-Router + Vuex + Axios + ElementUI

后端：Express + MongoDB + Socket.io + 七牛云存储图床

### 说明

要进入后台首先注册账号，进入数据库后在players文档中将指定目标用户的isAdmin改为true后重新登录，即可获得管理员权限。

如遇到bug直接在issue中提出。

项目的开发环境为Windows 10 、 Node v8.12.0 、 MongoDB 4.0.3

###  运行方法

(1) git clone https://github.com/SalmonDaze/VueExpressMongoDB-Blog.git

(2) npm install 

(3) npm run serve

(4) 安装 MongoDB 数据库

(5) CD server -> npm install -> node app.js

(6)npm run build 项目打包发布

### 项目功能

#### 已实现
- [x] 用户的登陆、注册
- [x] 用户头像上传
- [x] 用户的查询、删除
- [x] 用户个人空间
- [x] 文章的发布、修改、删除、查看
- [x] 文章的点赞、回复
- [x] 文章的分类创建、删除
- [x] 一对一聊天功能

#### 未实现
- [ ] 基于token的用户验证
- [ ] MongoDB关联查询
- [ ] 按文章类别分类

### 目录结构
        ├── config			// 项目dev和prod环境的配置
        ├── dist			// 项目build打包之后的目录
        ├── node_modules		// 项目依赖包
        ├── package.json		// 项目描述文件
        ├── public  			// 项目HTML挂载入口
        ├── server			    // 后端目录
        │   ├── data				// 数据库引入及实例化数据模型文件
        │   ├── node_modules			// 后端项目依赖
        │   ├── routes    			    // 后端路由
        │   └── app.js			// 后端项目入口文件
        ├── src					// 前端目录
        │   ├── assets				// 资源目录
        │   ├── components			// 项目组件
        │   ├── views			    // 项目视图组件
        │   ├── router				// Vue路由
        │   ├── store				// Vuex状态管理
        │   ├── App.vue				// 主页面 
        │   └── main.js				// Webpack 预编译入口
        ├── static			    // 静态资源目录
        ├── .babelrc			// ES6等babel的一些配置
        ├── .editorconfig		// 编辑器的一些配置
        ├── .eslintignore		// 忽略语法检查的目录文件，一般是忽略build和config目录
        ├── .eslintrc.js		// eslint的配置文件
        ├── vue.config.js		// vue-cli 3.0项目配置文件

### 演示图片
![avatar](https://raw.githubusercontent.com/SalmonDaze/VueExpressMongoDB-Blog/master/images/front.jpg)
![avatar](https://raw.githubusercontent.com/SalmonDaze/VueExpressMongoDB-Blog/master/images/back.jpg)
![avatar](https://raw.githubusercontent.com/SalmonDaze/VueExpressMongoDB-Blog/master/images/userpage.jpg)

### 结语

总体来说此项目有些功能并不完善，比如用户登陆为基于Cookie的验证，后端并没有用上mongoose的populate的关系查询等等，
但总体上基本把博客的功能实现了。接下去就是完善项目代码并提升性能。