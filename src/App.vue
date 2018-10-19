<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    created(){
      this.$http({
      method:'GET',
      withCredentials: true,
      url:'http://localhost:3000/checkLogin'
    }).then((res)=>{
      if(res.data.code==200){
        this.userCookie = res.data.message
        this.$store.username = res.data.message.username
        console.log(this.$store.username)
        if(!res.data.message.avatar_key){
          this.$store.avatar = 'http://pgq3wq57e.bkt.clouddn.com/default_avatar.jpeg'
        }else{
          this.$store.avatar = `http://pgq3wq57e.bkt.clouddn.com/${res.data.message.avatar_key}`
        }
      }
    })
    }
  }
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
