<template>
    <div class='article_list'>
            <div>
                <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="title" label="文章标题" width="180">
                    </el-table-column>
                    <el-table-column prop="author" label="作者" width="180">
                    </el-table-column>
                    <el-table-column prop="content" label="文章内容">
                    </el-table-column>
                    <el-table-column prop="revise" label="操作" width='80'>
                        <template slot-scope="scope">
                            <el-button type="danger" icon="el-icon-delete" circle @click='comfirm(scope.row)'></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </template>
                <el-pagination layout="prev, pager, next" :total="page" @current-change='changePage'>
                </el-pagination>
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
        this.$http.get('/articleCount').then((res)=>{
            this.page = res.data.length
        })
        this.getData(0)
    },
    methods:{
        comfirm(row){
            let Aid = row._id
            this.$confirm('此操作将永久删除此文章,是否继续?','提示',{
                confirmButtonText:'确定',
                calcelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                this.$http({
                url:'/admin/removeArticle',
                method:'POST',
                data:{
                    id:Aid
                },
                headers:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                },
            }).then((res)=>{
                this.$message({
                    type:'success',
                    message:res.data.message
                })
                setTimeout(()=>{
                    location.reload()
                },2000)
            }).catch( e => {
                console.log(e)
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
                url:'/getArticle',
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
                    let articleList = res.data
                    this.tableData = []
                    for(let i=0;i<articleList.length;i++){
                        this.tableData.push({
                            author:articleList[i].author,
                            content:articleList[i].content,
                            title:articleList[i].title,
                            _id:articleList[i]._id,
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .article_list{
        .el-pagination{
            margin-top:20px;
        }
    }
</style>