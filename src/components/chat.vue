<template>
    <div class='chat_box'>
        <slot name='close'></slot>
        <div class='message_contain'>
            <div class='message' style='overflow:auto;'>
                <div v-for='msg in messageList' :key='msg.nowDate' style='margin-top:20px;margin-left:10px;margin-right:10px;'>
                    <div style='text-align:left;' v-if='msg.receive'>
                        <img :src="msg.avatar" style='width:50px;height:50px;border-radius:100px;vertical-align:middle;'>
                        <span style='margin-left:10px;font-size:1.1em;background:#EBEEF5;padding:5px 10px 5px 10px;border-radius:10px;'>{{msg.message}}</span>
                        <br/>
                    </div>
                    <div style='text-align:right;' v-else>
                        <span style='margin-right:10px;font-size:1.2em;background:#67C23A;padding:5px 10px 5px 10px;border-radius:10px;'>{{msg.message}}</span>
                        <img :src="msg.avatar" style='width:50px;height:50px;border-radius:100px;vertical-align:middle;'>
                        <br/>
                    </div>
                </div>
            </div>
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="message">
            </el-input>
             <el-button type="primary" style='float:left;margin-top:10px;' @click='sendMessage()'>发送</el-button>
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
        props:['avatar','name','recipient','sender','show'],
        data(){
            return{
                message:'',
                messageList:[],
            }
        },
        mounted(){
                this.$socket.emit('new user',this.sender)
        },
        methods:{
            sendMessage(){
                let that = this
                let message = this.message
                let nowDate = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                let req = {
                    message:message,
                    sender:this.$store.username,
                    recipient:this.recipient,
                    avatar:that.$store.avatar,
                }
                this.messageList.push({
                        date:nowDate,
                        message:message,
                        sender:that.$store.username,
                        recipient:this.recipient,
                        avatar:that.$store.avatar,
                        receive:false
                    })
                this.$socket.emit('send message',req)
            }
        },
        sockets:{
            receiveMessage:function(res){
                let nowDate = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
                console.log(res)
                if(res.recipient == this.$store.username){
                    this.messageList.push({
                        date:nowDate,
                        message:res.message,
                        sender:res.sender,
                        recipient:res.recipient,
                        receive:true,
                        avatar:res.avatar,
                    })
                }
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
    .close{
        float:right;
        font-size:2em;
        margin-right:20px;
        margin-top:10px;
        &:hover{
            cursor: pointer;
        }
    }
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
