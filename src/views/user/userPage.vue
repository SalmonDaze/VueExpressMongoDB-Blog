<template>
    <div class='userpage_container'>
        <navbar></navbar>
        <div class='user_info'>
            <img :src='`http://pgq3wq57e.bkt.clouddn.com/${user.avatar_key}`'>
            <br/>
            <span>{{user.username}} <i class='el-icon-edit' alt='私信'></i></span>
            <br/>
            <p style='margin-top:10px;'>注册日期 {{user.create_at}}</p>
        </div>
        
    </div>
</template>
<script>
import navbar from '../../components/navbar.vue'
    export default{
        name:'userPage',
        components:{
            navbar
        },
        created(){
            this.$http({
            url:'http://localhost:3000/getUserInformation',
            method:'POST',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            data:{
                username:this.username
            }
        }).then((res)=>{
            this.user = res.data.user
        })
        },
        data(){
            return{
                username:this.$route.params.id,
                user:{},
            }
        },
    }
</script>
<style lang="scss" scoped>
    .userpage_container{
        width:100%;
        background:rgb(230, 230, 230);
        min-height: 500px;
        img{
            height:70px;
            width:70px;
            border-radius: 100px;
            margin-bottom: 10px;
        }
        .user_info{
            width:30%;
            margin:0 auto;
            margin-top:50px;
            span{
                margin-bottom:10px;
                color:#7a8381;
            }
        }
    }
    .navbar{
        background: white;
    }
</style>

