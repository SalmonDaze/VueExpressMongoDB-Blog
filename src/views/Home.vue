<template>
  <div class="home">
    <navbar></navbar>
    <el-row type="flex" class='grid'>
      <el-col :span="2"></el-col>
      <el-col :span="14"><div class="maincontainer"></div></el-col>
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
              <span v-if='userCookie.isAdmin' style='margin-left:30px;'><router-link :to='{}'>管理页面</router-link></span>
              <span><a style='margin-left:30px;' @click='logout'>用户登出</a></span>
            </el-main>
          </el-container>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '../components/navbar.vue'
export default {
  name: 'home',
  components: {
    navbar
  },
  data(){
    return{
      userCookie:'',
    }
  },
  created(){
    this.$http({
      method:'GET',
      withCredentials: true,
      url:'http://localhost:3000/checkLogin'
    }).then((res)=>{
      if(res.data.code==200){
        this.userCookie = res.data.message
      }
    })
  },
  methods:{
    logout(){
      this.$http({
        method:'POST',
        withCredentials:true,
        url:'http://localhost:3000/logout'
      }).then((res)=>{
        this.userCookie = !this.userCookie
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #navbar{
    height: 45px;
    background-color:rgba(255,255,255,0.5);
      .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
      .bg-purple {
      background: #d3dce6;
    }
      .bg-purple-light {
      background: #e5e9f2;
    }
  }
  .home{
    background: rgb(230,230,230);
      .grid{
    margin-top:50px;
      .user_Info{
        background: white;
        border-radius: 5px;
          &:hover{
            transform: translateY(-6px);
            box-shadow: 0 15px 35px 0 rgba(24, 44, 79, 0.15);
            transition: 0.5s;
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
      .maincontainer{
        height:1000px;
        background:skyblue;
        border-radius: 5px;
      }
  }
</style>

