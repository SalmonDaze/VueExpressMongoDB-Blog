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
                <el-upload
                  class="avatar-uploader"
                  action="https://upload.qiniup.com"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :data='postData'>
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
      imageUrl:'',
      postData:{
        token:'Sko4Ix3MKmajClJB5ktD-mwe_Vi4XEDD0Wvd1Z0u:Ut23Pzy8WVK5fU29k31xiQv0WAE=:eyJzY29wZSI6ImJhZGFwcGxlIiwiZGVhZGxpbmUiOjE1NzU3NjcwMDh9'
      },
      avatar_key:'',
    }
  },
  methods:{
    async registry(){
      let username = this.username
      let password = this.password
      let avatar_key = this.avatar_key ? this.avatar_key : 'default_avatar.jpeg'
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
        url:'/register',
        data:{
          username:username,
          password:password,
          avatar_key:avatar_key,
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
    handleAvatarSuccess(res, file) {   //上传成功后在图片框显示图片
        this.imageUrl = URL.createObjectURL(file.raw)
        this.avatar_key = `${res.key}?imageView2/1/w/200/h/200/q/75|imageslim`
      },
      handleError(res) {   //显示错误
        console.log(res)
      },
      beforeAvatarUpload(file) {    //在图片提交前进行验证
        const isJPG = file.type === 'image/jpeg'
        const isPNG = file.type === 'image/png'

        if (!isJPG&&!isPNG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
        }
        return isJPG && isPNG 
      }
  }
}
</script>

<style scoped lang="scss">
.avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width:200px;
    margin:0 auto;
    margin-bottom: 30px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
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
      height:600px;
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