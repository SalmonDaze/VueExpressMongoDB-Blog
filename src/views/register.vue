<template>
  <div class="register">  
      <input type="text" placeholder="请输入账号" v-model='username'><br/>
      <input type="password" placeholder="请输入密码" v-model='password'><br/>
      <button @click='registry'>注册</button>
  </div>
</template>

<script>
import navbar from '../components/navbar.vue'
export default {
  name: 'HelloWorld',
  components:{
    navbar
  },
  props: {
    msg: String
  },
  data(){
    return{
      username:'',
      password:'',
      msgs:'',
    }
  },
  methods:{
    registry(){
      let username = this.username
      let password = this.password
      this.$http({
        method:'POST',
        withCredentials:true,
        url:'http://localhost:3000/register',
        data:{
          username:username,
          password:password
        },
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        if(res.data.code == 1){
          this.msgs = res.data.message
          return
        }else{
          this.msgs = res.data.message
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style> 