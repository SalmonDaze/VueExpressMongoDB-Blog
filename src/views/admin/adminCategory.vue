<template>
    <div class='category_list'>
        <el-button type="primary" icon="el-icon-plus" class='add_category' @click='addCategory'>添加板块</el-button>
        <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="categoryname" label="板块名" width="180">
                    </el-table-column>
                    <el-table-column prop="create_at" label="创建日期" width="180">
                    </el-table-column>
                    <el-table-column prop="BID" label="板块ID">
                    </el-table-column>
                    <el-table-column prop="revise" label="操作" width='150'>
                        <template slot-scope="scope">
                            <el-button @click="deleteCategory(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
        </template>
    </div>    
</template>
<script>
    export default{
        name:'adminCategory',
        data(){
            return{
                tableData:[],
            }
        },
        created(){
            this.$http.get('/admin/getCategory').then((res)=>{
                console.log(res.data.data)
                for(let i=0 ;i<res.data.data.length;i++){
                    this.tableData.push({
                        categoryname:res.data.data[i].title,
                        create_at:res.data.data[i].create_at,
                        BID:res.data.data[i]._id
                    })
                }
            }).catch(e=>{
                console.log(e)
            })
        },
        methods:{
            deleteCategory(row){
                this.$http({
                    url:'/admin/deleteCategory',
                    method:'POST',
                    headers:{
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    data:{
                        id:row.BID
                    }
                }).then(()=>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    setTimeout(()=>{
                        location.reload()
                    },1000)
                })
            },
            addCategory(){
                this.$prompt('请输入板块标题','提示',{
                    confirmButtonText:'提交',
                    cancelButtonText:'取消',
                    inputValidator:function checkTitle(title){
                                        if(title.length == 0){
                                            return '标题不应为空'
                                        }
                                        else if(title.length >6){
                                            return '标题字数不得大于6个'
                                        }
                                    }
                }).then(({value})=>{
                    this.$http({
                        url:'/admin/addCategory',
                        method:'POST',
                        data:{
                            title:value
                        },
                        headers:{
                            'Content-Type' : 'application/x-www-form-urlencoded'
                        },
                    }).then((res)=>{
                        console.log(res)
                        if(res.data.code==200){
                            this.$message({
                                type:'success',
                                message:'创建成功'
                            })
                            setTimeout(()=>{
                                location.reload()
                            },1000)
                        }else{
                            this.$message.error(res.data.message)
                        }
                    })
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'取消输入'
                    })
                })
            },

        }
    }
</script>
<style lang="scss" scoped>
    .category_list{
        .add_category{
            float:left;
            margin-bottom: 20px;
        }
    }
</style>
