<template>
  <div class="navbar">
    <el-row id='navbar'>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4">
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
      }).then(()=>{
        this.userCookie = !this.userCookie
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  #navbar{
    height: 45px;
    background-color:white;
  }
  a{
    margin-top:100px;
  }
</style>

