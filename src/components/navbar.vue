<template>
  <div class="navbar">
    <el-row id='navbar'>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light" v-if='!userCookie'>
          <router-link :to="{path:'/register'}">注册</router-link>
          <router-link :to="{path:'/login'}">登录</router-link>
        </div>
        <div class="grid-content bg-purple-light" v-else>
          <router-link :to="{path:'/register'}">{{userCookie.username}}</router-link>
          <a @click='logout'>登出</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'navbar',
  data(){
    return{
      userCookie:'',
    }
  },
  components: {
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
  a{
    margin-top:100px;
  }
</style>

