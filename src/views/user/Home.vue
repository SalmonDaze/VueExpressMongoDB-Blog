<template>
  <div class="home">
    <navbar>
      <template slot='header'>
        <span style='color:white;'><img src='../../assets/reimu.png' style='height:35px;vertical-align:middle;margin-right:10px;'>Bad Apple!</span>
      </template>
    </navbar>
    <el-row type="flex" class='grid'>
      <el-col :span="2"></el-col>
      <el-col :span="14">
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
                    <el-main class='article_content' v-html='article.content'></el-main>
                    <el-footer class='article_info'>
                    <span>发布日期 {{article.create_at}}</span>
                    <span>  |  作者 {{article.author}}</span>
                    <span>  |  留言 {{article.comment.length}}</span>
                    <span>  |  浏览次数 {{article.views}}</span>
                    <span>  |  赞 {{article.like}}</span>
                    </el-footer>
                </el-container>
            </div>
            <el-pagination layout="prev, pager, next" :total="page" @current-change='changePage' background style='margin-bottom:20px;margin-top:10px;'>
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
      allArticleCount:0,
      SuibiCount:0,
      JishuCount:0,
      ShishiCount:0,
      title:'',
      content:'',
      articleList:[],
      page:0,
    }
  },
  created(){
    this.$http.get('http://localhost:3000/articleCount').then((res)=>{
            this.page = res.data.length + 10
        })
    this.$http({
      method:'GET',
      withCredentials: true,
      url:'http://localhost:3000/checkLogin'
    }).then((res)=>{
      if(res.data.code==200){
        this.userCookie = res.data.message
      }
    })
    this.getData(0)
  },
  methods:{
    changePage(pages){
      this.getData(pages-1)
    },
    getData(pages){
      this.$http({
          url:'http://localhost:3000/getArticle',
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
        url:'http://localhost:3000/logout'
      }).then(()=>{
        this.userCookie = !this.userCookie
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .home{
    background: rgb(230,230,230);
    min-height:500px;
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
            height: 200px;
            line-height: 50px;
            text-align: left;
            padding-left: 50px;
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
                .article_info{
                  padding-top:25px;
                  font-size:0.9em;
                }
            }
        }
    }
  }
</style>

