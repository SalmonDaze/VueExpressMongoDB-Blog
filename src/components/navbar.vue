<template>
  <div class="navbar">
    <el-row id='navbar'>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple-light">
        <router-link :to="{path:'/register'}">注册</router-link>
        <router-link :to="{path:'/login'}">登录</router-link>
        </div></el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'navbar',
  components: {
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

