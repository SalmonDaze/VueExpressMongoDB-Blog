<template>
  <div class="navbar">
    <el-row id='navbar'>
      <el-col :span="4" class='nav_header'>
        <slot name='header'></slot>
      </el-col>
      <el-col :span="16"><div class="grid-content bg-purple-light">
        <div v-if='$store.username'>
          <img :src='$store.avatar' class='avatar'>
        </div>  
      </div></el-col>
      <el-col :span="4" class='nav_footer'>
        <slot name='footer'></slot>
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
  props:{
    color:'',
  },
  components: {
  },
  created(){
    this.$http({
      method:'GET',
      withCredentials: true,
      url:'/checkLogin'
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
        url:'/logout'
      }).then(()=>{
        this.userCookie = !this.userCookie
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  #navbar{
    width:100%;
    height: 60px;
    box-shadow: 0 5px 35px 0 rgba(24, 44, 79, 0.15);
    .nav_header{
      font-size:1.2em;
      padding-top:10px;
    }
    .nav_footer{
      a{
        text-decoration: none;
        color:#409EFF;
      }
    }
  }
  a{
    margin-top:100px;
  }
  .avatar{
    margin-top:10px;
    width:40px;
    height:40px;
    border-radius: 100px;
  }
</style>

