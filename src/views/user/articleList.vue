<template>
    <div id='article'>
        <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">全部 ({{allArticleCount}})</el-menu-item>
            <el-menu-item index="2">个人随笔 ({{SuibiCount}})</el-menu-item>
            <el-menu-item index="3">技术分享 ({{JishuCount}})</el-menu-item>
            <el-menu-item index="4">实事杂谈 ({{ShishiCount}})</el-menu-item>
        </el-menu>
        <div class='article_list_content' v-for='article in articleList' :key='article._id'>
            <el-container class='article'>
                <el-header class='article_head'>{{article.title}}</el-header>
                <el-main class='article_content'>{{article.content}}</el-main>
                <el-footer class='article_info'>{{article.create_at}}</el-footer>
            </el-container>
        </div>
        <div>
            <input type="text" v-model='title'>
            <input type="text" v-model='content'>
            <button @click='addArticle()'>发布</button>
        </div>
    </div>
</template>

<script>

    export default{
        name:'articleList',
        data(){
            return{
                allArticleCount:0,
                SuibiCount:0,
                JishuCount:0,
                ShishiCount:0,
                title:'',
                content:'',
                articleList:[],
            }
        },
        created(){
            this.$http.get('/getArticle').then((res)=>{
                this.articleList = res.data
            })
        },
        methods:{
            addArticle(){
                let title = this.title
                let content = this.content
                this.$http({
                    method:'POST',
                    withCredentials:true,
                    url:'/admin/addArticle',
                    data:{
                        title:title,
                        content:content,
                    },
                    headers:{
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    } 
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    #article{
        background:rgb(220,220,220);
        width:100%;
        height:1000px;
        border-radius:10px;
        el-menu-time{
            width:100px;
        }
        .article_list_content{
            background:red;
            .article{
                margin-top:5px;
                text-align:left;
                width:100%;
                height:300px;
                background:white;
                .article_head{
                    padding-top:25px;
                    font-size:1.5em;
                }
                .article_content{
                    padding-top:30px;
                    padding-left:20px;
                }
            }
        }
    }
</style>