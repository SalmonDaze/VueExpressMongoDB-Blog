<template>
    <div class='user_list'>
            <div v-if='!this.$route.params.id'>
                <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="username" label="用户名" width="180">
                    </el-table-column>
                    <el-table-column prop="create_at" label="创建日期" width="180">
                    </el-table-column>
                    <el-table-column prop="UID" label="用户ID">
                    </el-table-column>
                    <el-table-column prop="isAdmin" label="当前用户组" width="180">
                    </el-table-column>
                    <el-table-column prop="revise" label="操作" width='150'>
                        <template slot-scope="scope">
                            <el-button @click="improvePower(scope.row)" type="text" size="small">提升用户组</el-button>
                            <el-button @click="removeUser(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </template>
                <el-pagination layout="prev, pager, next" :total="page" @current-change='changePage'>
                </el-pagination>
            </div>
            <div v-else>
                <router-view></router-view>
            </div>
    </div>  
</template>

<script>
export default {
    name:'adminArticleRevise',
    data(){
        return{
            tableData: [],
            page:0,
            currentPage:1,
        }
    },
    created(){
        this.$http.get('/admin/getUserCount').then((res)=>{
            this.page = res.data.length
        })
        this.getData(0)
    },
    methods:{
        improvePower(row){
            let UID = row.UID
            this.$confirm('确认提升该用户权限?','提示',{
                confirmButtonText:'确定',
                calcelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                this.$http({
                    url:'/admin/improvePower',
                    method:'POST',
                    data:{
                        uid:UID
                    },
                    headers:{
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                }).then((res)=>{
                    if(res.data.code == 200){
                        this.$message({
                            message:res.data.message,
                            type:'success'
                        })
                        setTimeout(()=>{
                            location.reload()
                        },1000)
                    }
                }).catch(e=>{console.log(e)})
                }).catch(()=>{
                    this.$message({
                    type:'info',
                    message:'取消操作'
                })
                })
        },
        handleClick(row){
            this.$router.push({
                name:'articleRevisePage',
                params:{
                    id:row._id
                }
            })
        },
        removeUser(row){
            let UID = row.UID
            this.$confirm('此操作将永久删除此用户,是否继续?','提示',{
                confirmButtonText:'确定',
                calcelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                this.$http({
                url:'/admin/removeUser',
                method:'POST',
                data:{
                    uid:UID
                },
                headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                }).then((res)=>{
                    if(res.data.code==200){
                        this.$message({
                            type:'success',
                            message:'取消操作'
                        })
                        setTimeout(()=>{
                            location.reload()
                        },1000)
                    }else{
                        console.log('删除失败！')
                    }
                })
                }).catch(()=>{
                    this.$message({
                    type:'info',
                    message:'取消操作'
                })
            })
        },
        changePage(pages){
            this.getData(pages-1)
        },
        getData(pages){
            this.$http({
                url:'/admin/getUserList',
                method:'POST',
                headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
                data:{
                    page:pages,
                    limit:10,
                    skip:10,
                }
                }).then((res)=>{
                    let userList = res.data.userList
                    this.tableData = []
                    for(let i=0;i<userList.length;i++){
                        this.tableData.push({
                            username:userList[i].username,
                            create_at:userList[i].create_at,
                            UID:userList[i]._id,
                            isAdmin:userList[i].isAdmin ? '管理员':'普通用户',
                        })
                    }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .user_list{
        .el-pagination{
            margin-top:20px;
        }
    }
</style>