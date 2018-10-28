<template>
  <div class="register">  
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content"></div></el-col>
          <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-container class='login'>
              <el-header class='login_head' style='height:100px;'>登录</el-header>
              <el-main class='login_main'>
                <el-input v-model="login_username" placeholder="请输入用户名"></el-input>
                <br/>
                <el-input v-model="login_password" placeholder="请输入密码" type=password></el-input>
                <br/>
                <el-button type="primary" @click='login'>登录</el-button>
                <el-alert
                  :title="msgs"
                  v-show='showError'
                  type="error"
                  center
                  show-icon>
                </el-alert>
                <br/>
                <span style='margin:0 auto;'><router-link style='font-size:14px;color:#409EFF' :to="{path:'/register'}">没有账号？点击注册</router-link></span>
              </el-main>
            </el-container>
          </div></el-col>
        <el-col :span="8"><div class="grid-content"></div></el-col>
      </el-row>
  </div>
</template>

<script>
import navbar from '../../components/navbar.vue'
export default {
  name: 'register',
  components:{
    navbar,
  },
  data(){
    return{
      msgs:'',
      comfirm:true,
      showError:false,
      login_username:'',
      login_password:'',
      userCookie:'',
    }
  },
  methods:{
    async login(){
      let login_username = this.login_username
      let login_password = this.login_password
      try {
        let res = await this.$http({
        method:'POST',
        withCredentials:true,
        url:'/login',
        data:{
          username:login_username,
          password:login_password
        },
        headers:{
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      })
      if(res.data.code == 1){
        this.msgs = res.data.message
        this.$message.error(this.msgs)
        return
      }else{
        this.msgs = res.data.message
        this.userCookie = res.data.userInfo
        this.$store.username = this.login_username
        this.$store.avatar = `http://pgq3wq57e.bkt.clouddn.com/${res.data.user.avatar_key}`
        this.$store.commit('add_login_user',{
          username:this.login_username,
          avatar:`http://pgq3wq57e.bkt.clouddn.com/${res.data.user.avatar_key}`
        })
        this.$message({
          message: '登录成功！',
          type: 'success'
        })
        this.$router.push({path:'/'})
      }
        }catch(err){
          console.log('Server Error Message :' + err)
        }

    }
  }
}
</script>

<style scoped lang="scss">
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .register{
    background:url('../../assets/register_bg2.jpg');
    background-size:100%;
    height:100vh;
    overflow: hidden;
    background-repeat: no-repeat;
  }
    .login{
    margin-top:80px;
    box-shadow: 0px 15px 20px #000000;
    .login_head{
      background:#409EFF;
      color:white;
      text-align:center;
      line-height: 100px;
      font-size:2em;
      letter-spacing:10px;
    }
    .login_main{
      height:300px;
      background:white;
      a{
          text-decoration: none;
      }
      .el-input{
        width:70%;
        margin-top:10px;
        margin-bottom: 20px;
      }
      .el-button{
        width:72%;
        margin-top:20px;
        margin-bottom: 20px;
      }
      .el-alert{
        width:50%;
        margin:0 auto;
        margin-top:20px;
        }
    }
  }
</style> 