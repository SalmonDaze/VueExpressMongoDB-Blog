<template>
  <div class="home">
    <navbar>
      <template slot='header'>
        <router-link :to="{path:'/'}"><span style='color:black;'>
          <img src='../../assets/reimu.png' style='height:35px;vertical-align:middle;margin-right:10px;'>Bad Apple!</span></router-link>
      </template>
    </navbar>
    <el-row type="flex" class='grid'>
      <el-col :span="2"></el-col>
      <el-col :span="14">
        <div id='article'>
            <div v-if='articleList.length == 0' class='none_article'>
              当前无内容
            </div>
            
            <div class='article_list_content' v-for='article in articleList' :key='article._id'>
              <router-link :to="{name:'article',params:{id:article._id}}">
                <el-container class='article'>
                    <el-header class='article_head'>{{article.title}}</el-header>
                    <el-main class='article_content' v-html='article.content'></el-main>
                    <el-footer class='article_info'>
                    <span>发布日期 {{article.create_at}}</span>
                    <span>  |  作者 {{article.author.name}}</span>
                    <span>  |  留言 {{article.comment.length}}</span>
                    <span>  |  浏览次数 {{article.views}}</span>
                    <span>  |  赞 {{article.like}}</span>
                    </el-footer>
                </el-container>
                </router-link>
            </div>
            <el-pagination :page-size='5' layout="prev, pager, next" :total="page" @current-change='changePage' background style='margin-bottom:20px;margin-top:10px;'>
            </el-pagination>
        </div>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6">
          <el-container class='user_Info'>
            <el-header class='user_Info_head' style='height:100px;' v-if='!userCookie'>登陆</el-header>
            <el-header class='user_Info_head' style='height:100px;' v-else>欢迎</el-header>
            <div class='hr'></div> 
            <el-main class='user_Info_container' v-if='!userCookie' style='height:100px;'>
              请先<router-link :to="{path:'/login'}">登陆</router-link>或<router-link :to="{path:'/register'}">注册</router-link>
            </el-main>
            <el-main class='user_Info_container' v-else>
              <img :src='this.$store.avatar' class='avatar'>
              <br/>
              <span>欢迎登陆</span>
              {{userCookie.username}}
              <br/>
              <span>当前用户组为{{userCookie.isAdmin ? '管理员' : '普通用户'}}</span>
              <br/>
              <span><router-link :to="{name:'userPage',params:{id:userCookie.username}}">个人页面</router-link></span>
              <span v-if='userCookie.isAdmin' style='margin-left:30px;'><router-link :to="{path:'/admin/info'}">管理页面</router-link></span>
              <span><a style='margin-left:30px;' @click='logout'>用户登出</a></span>
            </el-main>
          </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import navbar from '../../components/navbar.vue'
import articleList from './articleList.vue'
export default {
  name: 'home',
  components: {
    navbar,
    articleList,
  },
  data(){
    return{
      userCookie:'',
      title:'',
      content:'',
      articleList:[],
      page:0,
      avatar:'',
    }
  },
  created(){
    this.$http.get('/articleCount').then((res)=>{
            this.page = res.data.length
            console.log(res.data)
        })
    this.getData(0)
      this.$http({
      method:'GET',
      withCredentials: true,
      url:'/checkLogin'
    }).then((res)=>{
      if(res.data.code==200){
        this.userCookie = res.data.message
        this.$store.username = res.data.message.username
      }
    })
  },
  methods:{
    changePage(pages){
      this.getData(pages-1)
    },
    getData(pages){
      this.$http({
          url:'/getArticle',
          method:'POST',
          headers:{
              'Content-Type' : 'application/x-www-form-urlencoded'
          },
          data:{
              page:pages,
              limit:5,
              skip:5,
          }
          }).then((res)=>{
              this.articleList = res.data
              })
          },
    logout(){
      this.$http({
        method:'POST',
        withCredentials:true,
        url:'/logout'
      }).then(()=>{
        this.userCookie = !this.userCookie
        this.$store.commit('init')
      })
    },
    clickBtn(){
      this.$socket.emit('msg','123')
    }
    },
    sockets:{
      connect:function(){
        console.log('socket connected')
      }
    }
  }
</script>
<style lang="scss" scoped>
  .home{
    a{
      color:rgb(22, 22, 22);
      text-decoration: none;
    }
    background: rgb(230,230,230);
    min-height:500px;
    .none_article{
      background: white;
      height: 170px;
      text-align: center;
      padding-top: 130px;
      margin-top:5px;
    }
      .grid{
      margin-top:50px;
      .user_Info{
        background: white;
        border-radius: 5px;
        transition: 0.3s;
          &:hover{
            transform: translateY(-6px);
            box-shadow: 0 15px 35px 0 rgba(24, 44, 79, 0.15);
            
          }
          .hr{
            width:82%;
            height: 1px;
            margin-left:30px;
            background: #67C23A;
            margin-top:-10px;
          }
          .user_Info_head{
            text-align:left;
            margin-left:25px;
            font-size: 1.3em;
            line-height: 100px
          }
          .user_Info_container{
            height: 320px;
            line-height: 50px;
            text-align: left;
            padding-left: 50px;
            .avatar{
              width:100px;
              height: 100px;
              border-radius: 10px;
            }
            a{
              color:#67C23A;
              text-decoration: none;
              cursor:pointer;
            }
          }
        }
    }
    #article{
        width:100%;
        border-radius:10px;
        el-menu-time{
            width:100px;
        }
        .article_list_content{
            .article{
                margin-top:5px;
                text-align:left;
                width:100%;
                height:300px;
                background:white;
                transition: .3s;
                &:hover{
                  transform: translateY(-4px);
                  box-shadow: 0 15px 35px 0 rgba(24, 44, 79, 0.15);
                }
                .article_head{
                    padding-top:25px;
                    font-size:1.5em;
                }
                .article_content{
                    padding-top:30px;
                    padding-left:20px;
                }
                .article_info{
                  padding-top:25px;
                  font-size:0.9em;
                }
            }
        }
    }
  }
</style>

