<template>
  <div class="register">  
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content"></div></el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-container class='registe'>
              <el-header class='registe_head' style='height:100px;'>用户注册</el-header>
              <el-main class='registe_main'>
                <el-input v-model="username" placeholder="请输入用户名"></el-input>
                <br/>
                <el-input v-model="password" placeholder="请输入密码" type=password></el-input>
                <br/>
                <el-input v-model='repassword' placeholder="请再次输入密码"  type=password></el-input>
                <br/>
                <validate class='validate' v-on:comfirm-success='comfirm = !comfirm'></validate>
                <el-button type="primary" :disabled='comfirm' @click='registry'>注册</el-button>
                <el-alert
                  :title="msgs"
                  v-show='showError'
                  type="error"
                  center
                  show-icon>
                </el-alert>
                <br/>
                <span style='margin:0 auto;'><router-link :to="{path:'/login'}" style='font-size:14px;color:#409EFF'>已有账号？点击登录</router-link></span>
              </el-main>
            </el-container>
          </div></el-col>
        <el-col :span="8"><div class="grid-content"></div></el-col>
      </el-row>
  </div>
</template>

<script>
import navbar from '../../components/navbar.vue'
import validate from '../../components/validate.vue'
export default {
  name: 'register',
  components:{
    navbar,
    validate
  },
  data(){
    return{
      show:true,
      username:'',
      password:'',
      repassword:'',
      msgs:'',
      comfirm:true,
      showError:false,
      login_username:'',
      login_password:'',
    }
  },
  methods:{
    async registry(){
      let username = this.username
      let password = this.password
      if(this.repassword != this.password){
        this.msgs = '输入的密码不一致'
        this.$message.error(this.msgs)
        return
      }else if(username.length < 6 || username.length > 12){
        this.$message.error('用户名长度应在6-12之间')
        return
      }else if(password.length < 6 ){
        this.$message.error('密码最小长度为6')
        return
      }
      try {
        let res = await this.$http({
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
      })
      if(res.data.code == 1){
        this.msgs = res.data.message
        this.$message.error(this.msgs)
        return
      }else{
        this.msgs = res.data.message
        this.$message({
          message: '注册成功！页面将于3秒后跳转',
          type: 'success'
        })
        setTimeout(()=>{this.$router.push({path:'/'})},3000)
      }
        }catch(err){
          console.log('Server Error :' + err)
        }
    },
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
  .registe{
    margin-top:80px;
    box-shadow: 0px 15px 20px #000000;
    .registe_head{
      background:#409EFF;
      color:white;
      text-align:center;
      line-height: 100px;
      font-size:2em;
      letter-spacing:10px;
    }
    .registe_main{
      height:400px;
      background:white;
      a{
        text-decoration: none;
      }
      .el-input{
        width:70%;
        margin-top:10px;
        margin-bottom: 20px;
      }
      .validate{
        width:70%;
        margin-top:25px;
        margin:0 auto;
        border-radius: 10px;
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