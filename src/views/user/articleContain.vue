<template>
    <div class='article_container'>
        <navbar>
            <template slot='header'>
        <router-link :to="{path:'/'}"><span style='color:white;'>
          <img src='../../assets/reimu.png' style='height:35px;vertical-align:middle;margin-right:10px;'>Bad Apple!</span></router-link>
      </template>
        </navbar>
        <div class="article">
            <el-container>
                <el-header>
                    <span class='title'>
                        {{articleContent.title}}
                    </span>
                    
                <p>
                    <span><i class='el-icon-info'> 作者 {{articleContent.author}}</i></span>
                    <span><i class='el-icon-date'> 发布日期 {{articleContent.create_at}}</i></span>
                    <span><i class='el-icon-view'> 浏览 {{articleContent.views}}</i></span>
                    <span class='like' v-if='!isVoted'><i class='el-icon-star-off' @click='upvote'> 点赞 {{articleContent.like}}</i></span>
                    <span class='like' v-else><i class='el-icon-star-on' @click='downvote'> 已点赞 {{articleContent.like}}</i></span>
                    <span><i class='el-icon-edit'> 评论 {{commentLength}}</i></span>
                </p>
                <div class="hr">
                </div>
                </el-header>
                <el-main v-html='articleContent.content'></el-main>
                <el-footer>
                </el-footer>
                <div style='background:white;rgb(10,10,10)'>
                    <span class='footer_title' style='float:left;margin-left:30px;margin-top:30px;'>评论列表</span>
                        <div v-if='commentLength == 0' style='margin-top:100px;margin-bottom:100px;'>
                            当前无评论
                        </div>
                        <div v-else style='margin-top:90px;'>
                            <div v-for='comment in commentList' :key='comment.create_at' style='margin-top:20px;text-align:left;margin-left:140px;'>
                                <span style='color:#67C23A'>{{comment.username}}</span>
                                <br/>
                                <span style='line-height:50px;margin-left:30px;'>{{comment.content}}</span>
                                <br/>
                                <span style='font-size:0.8em;padding-top:10px;'>发表日期: {{comment.date}}</span>
                                <br/>
                                <div class="hr2" style='width:70%;height:1px;background:rgb(220,220,220);margin-top:10px;'></div>
                            </div>
                        </div>
                        <div style='width:80%;margin:0 auto;'>
                            <el-input type="textarea" :rows="6" placeholder="快来发表评论吧" v-model='comment' style='margin-top:30px;'></el-input>
                            <el-button plain style='float:left;margin-top:20px;margin-bottom:40px;' @click='publishComment'>发表评论</el-button>
                        </div>
                </div>
            </el-container>
            
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
                    },headers:{
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'发表成功！'
                    })
                })
            },
            upvote(){
                let id = this.$route.params.id
                this.isVoted = true
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
                url:'http://localhost:3000/getArticleContent',
                data:{
                    id:this.$route.params.id
                },
                headers:{'Content-Type' : 'application/x-www-form-urlencoded'}
            }).then((res)=>{
                this.articleContent = res.data.article
                this.commentLength = res.data.article.comment.length
                this.commentList = res.data.article.comment
                console.log(res)
            })

            this.$http({
                method:'POST',
                url:'http://localhost:3000/checkvote',
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
}
</script>
<style lang="scss" scoped>
    .article_container{
        width:100%;
        background: rgb(230,230,230);
        .article{
            width:70%;
            margin:0 auto;
            margin-top:60px;
            .el-container{
                margin-top:50px;
                margin:0 auto;
                background: rgb(245,245,245);
                .footer_title{
                .hr{
                    width:95%;
                    height: 1px;
                    background: #409EFF;
                    margin:0 auto;
                    margin-top:20px;
                }
                }
                
                .el-header{
                    padding-top:30px;
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
</style>
