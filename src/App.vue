<template>
  <div id="app">
    <router-view></router-view>
    <div class='send_message' v-show='chat_show'>
      <el-button @click='checkname'>发送消息</el-button>
    </div>
    <chat v-if='sw' :sender='sender' :recipient="recipient" :avatar='target_avatar' :name='recipient'>
      <template slot='close'><span class='close' @click='sw = !sw'><i class='el-icon-close'></i></span></template>
    </chat>
  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import chat from './components/chat.vue'
  export default{
    components:{
      chat,
      
    },
    data(){
      return{
        sw:false,
        target_avatar:'',
        sender:'',
        recipient:'',
        chat_show:false,
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
        this.$store.username = res.data.message.username
        if(!res.data.message.avatar_key){
          this.$store.avatar = 'http://pgq3wq57e.bkt.clouddn.com/default_avatar.jpeg'
        }else{
          this.$store.avatar = `http://pgq3wq57e.bkt.clouddn.com/${res.data.message.avatar_key}`
        }
      }
    })
      this.chat_show = this.$store.state.username ? true : false
    },
    mounted(){
    },
    methods:{
      checkname(){
        this.$prompt('请输入用户名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$http({
            method:'POST',
            url:'/getUserInformation',
            headers:{
              'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data:{
              username:value,
            }
          }).then((res)=>{
            console.log(res)
            if(!res.data.user || value == this.$store.username){
              this.$message.error('请输入正确用户信息！')
            }else{
              this.recipient = res.data.user.username
              this.target_avatar = `http://pgq3wq57e.bkt.clouddn.com/${res.data.user.avatar_key}`
              this.sender = this.$store.username
              this.sw = !this.sw
            }
          })
        }).catch(err=>{
          this.$message.error('取消输入')
        })
      }
    },
    computed:mapState([
      'username'
    ]),
    watch:{
      username: function(val){
        this.chat_show = val ? true : false
      }
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
.send_message{
  .el-button{
  position:fixed;
  width:150px;
  height: 50px;
  top:900px;
  right:150px;
}
}

</style>
