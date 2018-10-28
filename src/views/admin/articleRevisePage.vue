<template>
    <div class='article_add'>
        <div class='text-input-area'>
            <div class='input_title'>
                修改文章
            </div>
            <div class="hr"></div>
            <br/>
            <span>文章板块：</span>
            <select v-model='category' class='article_catogory'>
                <option :value="categorys" v-for="categorys in categoryList" :key='categorys'>{{categorys}}</option>
            </select>
            <br>
            <span>文章标签：</span>
            <input class="tags_input"  @keyup.enter='addtags()' v-model='tags_input'>
            <el-tag v-for="tag in tags" :key="tag.name" :type="tag.type" closable @close='handleClose(tag)'>
                {{tag.name}}
            </el-tag>
            <br/>  
            <br/>
            <el-input placeholder="请输入标题" v-model="title" clearable class='article_title'>
            </el-input>
            <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption">
                {{resarticle.content}}
            </quill-editor>
            <el-button type="primary" class='release' @click='reviseArticle()' ref='releasebtn' :disabled="btnswitch">修改</el-button>
            <el-button type="warning" class='reset' @click="$router.push({name:'ArticleRevise'})">返回</el-button>
        </div>
    </div>
</template>
<script>
import toolbarOptions from '../../../static/config.js'
export default{
    name:'Addarticle',
    data(){
        return {
            editorOption:{
                modules:{
                        toolbar:toolbarOptions
                    },
            },
            content:'',
            title:'',
            tags:[],
            tags_input:'',
            bk:'',
            btnswitch:false,
            resarticle:{},
            category:'',
            categoryList:[],
        }
    },
    methods:{
        async getArticle(){
            try{
                let res = await this.$http({
                    method:'POST',
                    url:'/admin/getArticle',
                    data:{
                        id:this.$route.params.id
                    },
                    headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                })
                if(res.data.code==200){
                    console.log(res.data)
                    this.title = res.data.article[0].title
                    this.content = res.data.article[0].content
                    this.radio = res.data.article[0].radio
                    this.category = res.data.article[0].category
                }else{
                    this.$message.error('修改失败!')
                }
            }catch(e){
                console.log(e)
                }
        },
        async reviseArticle(){
            let title = this.title
            let content = this.content
            let category = this.category
            if( title == '' || content == '' ){
                this.$message({
                message: '文章内容不完整',
                type: 'warning'
                })
                return
            }
            try{
                let res = await this.$http({
                    method:'POST',
                    url:'/admin/reviseArticle',
                    data:{
                        title:title,
                        content:content,
                        id:this.$route.params.id,
                        category:category
                    },
                    headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                    }
                })
                if(res.data.code == 200){
                    this.$message({
                        message:'修改成功！',
                        type:'success'
                    })
                    this.btnswitch = true
                    setTimeout(()=>{this.$router.push({path:'/'})},3000)
                }else{
                    this.$message.error('修改失败！')
                }
            }catch(e){
                console.log(e)
            }
        },
        addtags(){
            if( this.tags.length < 5 ){
                this.tags_input === '' ? this.$message.error('标签不可为空') : 
                this.tags_input.length > 5 ? this.$message.error('标签字数不可超过5个') : 
                this.tags.push({name:this.tags_input,type:''})
                this.tags_input = ''
            }else{
                this.$message.error('最多可放置5个标签');
                this.tags_input = ''
            }
        },
        handleClose(tag){
            this.tags.splice(this.tags.indexOf(tag),1)
        },
    },
    created(){
        this.getArticle()
        this.$http.get('/admin/getCategory').then((res)=>{
                console.log(res.data.data)
                for(let i=0 ;i<res.data.data.length;i++){
                    this.categoryList.push(res.data.data[i].title,)
                }
            }).catch(e=>{
                console.log(e)
            })
        }
}
</script>
<style lang="scss" scoped>
    .article_add{
        margin-top:0px;
        .input_title{
            font-size:2em;
        }
        .hr{
            margin-top:10px;
            width:15%;
            background:#67C23A;
            height: 2px;
            margin-bottom: 50px;
        }
        .article_catogory{
                outline: none;
                height: 28px;
                border-radius: 5px;
                width:100px;
                margin-bottom: 30px;
                width:10%;
                margin-left:0px;
                border-color:skyblue;
        }
        width:100%;
        .el-dropdown{
            &:hover{
                cursor: pointer;
            }
            font-size:1em;
            color:#409EFF;
        }
        .text-input-area{
            width:70%;
            margin-left:200px;
            text-align: left;
            height:90vh;
            .el-tag{
                margin-left:10px;
            }
            .tags_input{
                width:10%;
                height:25px;
                border-radius:5px;
                border:1px solid skyblue;
            }
            .quill-editor{
                margin-top:30px;
                height:300px;
            }
            .article_title{
                width:50%;
                margin-top:30px;
            }
            .release{
                margin-top:80px;
                width:100px;
            }
            .reset{
                width:100px;
                margin-left:30px;
            }
        }
    }
</style>
