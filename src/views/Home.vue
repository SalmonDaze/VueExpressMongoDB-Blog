<template>
  <div class="home">
    <navbar></navbar>
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

