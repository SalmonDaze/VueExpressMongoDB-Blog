<template>
    <div class='article_container'>
        <navbar>
            <template slot='header'>
        <router-link :to="{path:'/'}"><span style='color:black;'>
          <img src='../../assets/reimu.png' style='height:35px;vertical-align:middle;margin-right:10px;'>Bad Apple!</span></router-link>
      </template>
        </navbar>
        <div class="article">
            <el-container>
                <el-header>
                    <span class='title'>
                        {{articleContent.title}}
                    </span>
                    <div class='article_if'>
                        <span>  {{articleContent.category}}</span>
                        <span>  {{articleContent.create_at}}</span>
                        <span> {{articleContent.views}}阅读</span>
                        <span class='like' v-if='!isVoted'  @click='upvote'> {{articleContent.like}}喜欢</span>
                        <span class='like' v-else  @click='downvote' style='color:#F56C6C'> {{articleContent.like}}喜欢</span>
                        <span> {{commentLength}}评论</span>
                    </div>
                <div class="hr">
                </div>
                </el-header>
                <el-main v-html='articleContent.content'></el-main>
                <el-footer>
                </el-footer>
                <div style='background:white;rgb(10,10,10)'>
                    
                    <span class='footer_title' style='float:left;margin-left:80px;margin-top:30px;'><span style='margin-right:10px;font-size:1.2em;'>{{commentLength}}</span>评论</span>
                    <div class="hr" style='float:left;margin-left:80px;'></div>
                        <div v-if='commentLength == 0' style='margin-top:100px;margin-bottom:100px;'>
                            当前无评论
                        </div>
                        <div v-else style='margin-top:90px;'>
                            <div v-for='comment in commentList' :key='comment.create_at' style='margin-top:20px;text-align:left;margin-left:140px;'>
                                <div style='margin-bottom:5px;'>
                                    <img :src="comment.avatar" class='avatar'>
                                    <router-link :to="{name:'userPage',params:{id:comment.username}}"><span style='color:#67C23A;font-size:1.2em;margin-left:10px;'>{{comment.username}}</span></router-link><span v-if='comment.username ==  name ' style='font-size:0.9em;margin-left:5px;color:#409EFF;'>作者</span><span style='margin-left:6px;font-size:0.9em;'>发表:</span>
                                    
                                </div>
                                <br/>
                                <div style='line-height:25px;margin-right:100px;'>
                                    <span>{{comment.content}}</span>
                                </div>
                                <br/>
                                <div style='margin-top:10px;'>
                                    <span style='font-size:0.8em;'>#{{commentList.indexOf(comment)+1}}</span><span style='font-size:0.8em;padding-top:10px;margin-left:20px'>{{comment.date}}</span>
                                </div>
                                <br/>
                                <div class="hr2" style='width:90%;height:1px;background:rgb(220,220,220);margin-top:10px;'></div>
                            </div>
                        </div>
                        <div style='width:80%;margin-left:130px;'>
                            <el-input type="textarea" :rows="6" :placeholder="textarea_msg" v-model='comment' style='margin-top:30px;' :disabled="btnswitch">
                                <div class='zhezhao'></div>
                            </el-input>
                            
                            <el-button plain style='float:left;margin-top:20px;margin-bottom:40px;' @click='publishComment' :disabled="btnswitch">发表评论</el-button>
                        </div>
                </div>
            </el-container>
        </div>
        <div class='author_info'>
            <img :src="avatar" class='avatar'>
            <span style='margin-left:10px;'>{{name}}</span>
            <br/>
            <el-button type="primary" @click='$router.push({path:`/user/${name}`})'>个人主页</el-button>
        </div>
    </div>
</template>
<script>
import navbar from '../../components/navbar.vue'
    export default{
        name:'articleContain',
        components:{
            navbar
        },
        data(){
            return{
                articleContent:{},
                commentLength:0,
                comment:'',
                commentList:[],
                isVoted:false,
                likeList:[],
                avatar:'',
                name:'',
                btnswitch:true,
                textarea_msg:'',
            }
        },
        methods:{
            async publishComment(){
                let comment = this.comment
                this.$http({
                    url:'http://localhost:3000/publishComment',
                    method:'POST',
                    data:{
                        id:this.$route.params.id,
                        comment:comment,
                        username:this.$store.username,
                        avatar:this.$store.avatar,
                        article:this.articleContent,
                        
                    },headers:{
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'发表成功！'
                    })
                    this.btnswitch = !this.btnswitch
                    setTimeout(()=>{location.reload()},1000)
                })
            },
            upvote(){
                let id = this.$route.params.id
                if(!this.$store.state.username){
                    this.$message.error('请先登陆！')
                    return
                }
                this.$http({
                    url:'http://localhost:3000/upvote',
                    method:'POST',
                    data:{
                        id:id,
                        username:this.$store.username
                    },headers:{
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'点赞成功！'
                    })
                })
            },
            downvote(){
                let id = this.$route.params.id
                this.$http({
                    url:'http://localhost:3000/downvote',
                    method:'POST',
                    data:{
                        id:id,
                        username:this.$store.username
                    },headers:{
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'取赞成功！'
                    })
                })
            },
        },
        created(){
            this.$http({
                method:'POST',
                url:'/getArticleContent',
                data:{
                    id:this.$route.params.id
                },
                headers:{'Content-Type' : 'application/x-www-form-urlencoded'}
            }).then((res)=>{
                this.articleContent = res.data.article
                this.commentLength = res.data.article.comment.length
                this.commentList = res.data.article.comment
                this.avatar = res.data.article.author.avatar
                this.name = res.data.article.author.name
            })

            this.$http({
                method:'POST',
                url:'/addViews',
                data:{
                    id:this.$route.params.id
                },
                headers:{'Content-Type' : 'application/x-www-form-urlencoded'}
            }).then((res)=>{
                console.log(res)
            })

            this.$http({
                method:'POST',
                url:'/checkvote',
                data:{
                    id:this.$route.params.id
                },
                headers:{'Content-Type' : 'application/x-www-form-urlencoded'}
            }).then((res)=>{
                this.likeList = res.data.message
                this.likeList.map((x)=>{
                    this.isVoted = x === this.$store.username ? true : false
                }
            )
        })
        
    },
    mounted(){
        if(this.$store.state.username){
            this.btnswitch = false
            this.textarea_msg = '快来发表评论吧'
        }else{
            this.btnswitch = true
            this.textarea_msg = '请先登陆后再评论'
        }
    }
}
</script>
<style lang="scss" scoped>
a{
    
        text-decoration: none;
}
.hr{
    width:90%;
    height: 1px;
    background: rgb(200,200,200);
    margin:0 auto;
    margin-top:20px;
}
    .article_container{
        width:100%;
        background: white;
        float:left;
        .article{
            width:50%;
            margin-left:250px;
            margin-top:60px;
            .el-container{
                margin-top:50px;
                margin:0 auto;
                width:900px;
                float:left;
                .footer_title{
                
                }
                
                .el-header{
                    padding-top:30px;
                    .article_if{
                        font-size:0.9em;
                        span{
                            margin-left:10px;
                            color:rgb(150,150,150)
                        }
                    }
                    .like{
                        &:hover{
                            cursor: pointer;
                            color:#F56C6C;
                        }
                    }
                    .title{
                        font-size:2em;
                    }
                    p{
                        margin-top:20px;
                        span{
                            margin-left:20px;
                        }
                    }
                }
                .el-main{
                    margin-top:90px;
                    min-height: 350px;
                    text-align: left;
                    text-indent: 2em;
                    font-size:1.1em;
                    line-height: 2em;
                    padding-left: 50px;
                    padding-right:50px;
                }
                
            }
        }
    }
    .avatar{
        width:45px;
        height: 45px;
        border-radius: 100px;
        vertical-align:middle;
    }
    .author_info{
        width:300px;
        height: 300px;
        float:right;
        margin-right:120px;
        margin-top:20px;
        img{
            margin-bottom: 10px;
        }
        span{
            color:#67C23A;
            font-size:1.2em;
        }
        .el-button{
            margin-top:20px;
        }
    }
    .zhezhao{
        background: black;
        width:100%;
        height:100px;
    }
</style>
