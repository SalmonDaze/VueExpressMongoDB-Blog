<template>
    <div class='chat_box'>
        <div class='message_contain'>
            <div class='message'>

            </div>
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="message">
            </el-input>
             <el-button type="primary" style='float:left;margin-top:10px;'>发送</el-button>
        </div>
        <div class='target_info'>
            <img :src="avatar">
            <br/>
            <span v-text='name'></span>
        </div>
        <div class='info'>
            <img :src="$store.avatar">
            <br/>
            <span v-text='$store.username'></span>
        </div>
    </div>
</template>
<script>
    export default{
        name:'chat',
        props:['avatar','name'],
        data(){
            return{
                message:'',
            }
        }
    }
</script>
<style lang="scss" scoped>
.chat_box{
    height: 650px;
    width:900px;
    border:1px solid black;
    background: white;
    border-radius: 5px;
    position: fixed;
    z-index: 99999;
    left:350px;
    top: 50px;
    .message_contain{
        margin-left:40px;
        width:550px;
        float:left;
        .message{
            margin-top:50px;
            width:550px;
            height:400px;
            background:white;
            border:1px solid rgb(220,220,220);
            margin-bottom: 20px;
        }
    }
    .target_info{
        margin-left:650px;
        margin-top:50px;
        img{
            width:170px;
            height: 170px;
            border:1px solid #67C23A;
            border-radius: 100px;
            margin-bottom: 20px;
        }
    }
    .info{
        margin-left:650px;
        margin-top:130px;
        img{
            width:170px;
            height: 170px;
            border:1px solid #67C23A;
            border-radius: 100px;
            margin-bottom: 20px;
        }
    }
}
</style>
