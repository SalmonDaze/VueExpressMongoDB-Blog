<template>
    <div class='userpage_container'>
        <navbar>
            <template slot='header'>
        <router-link :to="{path:'/'}"><span style='color:black;'>
          <img src='../../assets/reimu.png' style='height:35px;width:32px;vertical-align:middle;margin-right:10px;'>Bad Apple!</span></router-link>
      </template>
        </navbar>
        <div class='user_info'>
            <img :src='`http://pgq3wq57e.bkt.clouddn.com/${user.avatar_key}`'>
            <br/>
            <span>{{user.username}} <i class='el-icon-edit' alt='私信'></i></span>
            <br/>
            <p style='margin-top:10px;'>注册日期 {{user.create_at}}</p>
        </div>
        <div class='recent_article'>
            <template>
                <el-table :data="tableData1" style="width: 100%" @row-click='openArticle'>
                <el-table-column prop="article" label="最近回复文章"></el-table-column>
                </el-table>
            </template>
        </div>
        <div class='recent_comment'>
            <template>
                <el-table :data="tableData2" style="width: 100%" @row-click='openArticle'>
                <el-table-column prop="article" label="最近发布文章"></el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
import navbar from '../../components/navbar.vue'
import chat from '../../components/chat.vue'
    export default{
        name:'userPage',
        components:{
            navbar,
            chat
        },
        created(){
            this.$http({
            url:'/getUserInformation',
            method:'POST',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data:{
                username:this.username
            }
        }).then((res)=>{
            this.user = res.data.user
            if(res.data.user.comments != 0){
                res.data.user.comments.map( x => {
                    let isExsit = false
                    for(let i=0;i<this.tableData1.length;i++){
                        if(this.tableData1[i]['id'] == x._id){
                            isExsit = true
                        }
                    }
                    if(!isExsit){
                        this.tableData1.push({article:x.article.title,id:x._id})
                        isExsit = !isExsit
                    }
                })
            }
            if(res.data.user.articles != 0){
                res.data.user.articles.map( x => {
                    this.tableData2.push({article:x.title,id:x._id})
                })
            }
        })
        },
        data(){
            return{
                username:this.$route.params.id,
                user:{},
                tableData1:[],
                tableData2:[],
            }
        },
        methods:{
            openArticle(row){
                this.$router.push({path:`/p/${row.id}`})
            }
        }
    }
</script>
<style lang="scss" scoped>
    .userpage_container{
        width:100%;
        background:rgb(230, 230, 230);
        min-height: 500px;
        img{
            height:70px;
            width:70px;
            border-radius: 100px;
            margin-bottom: 10px;
        }
        .user_info{
            width:30%;
            margin:0 auto;
            margin-top:50px;
            span{
                margin-bottom:10px;
                color:#7a8381;
            }
        }
        .recent_article{
            width:60%;
            margin:0 auto;
            margin-top:30px;
            margin-bottom:200px;
        }
        .recent_comment{
            
            width:60%;
            height:500px;
            margin:0 auto;
            margin-top:30px;
            thead{
                color:grey;
                padding-left:20px;
                margin:0 auto;
            }
        }
    }
    .navbar{
        background: white;
    }
</style>

