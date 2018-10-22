<template>
    <div class='article_list'>
            <div v-if='!this.$route.params.id'>
                <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="title" label="文章名称" width="180">
                    </el-table-column>
                    <el-table-column prop="author" label="作者" width="180">
                    </el-table-column>
                    <el-table-column prop="category" label="文章板块" width='140'>
                    </el-table-column>
                    <el-table-column prop="content" label="文章内容">
                    </el-table-column>
                    <el-table-column prop="revise" label="操作" width='150'>
                        <template slot-scope="scope">
                            <el-button @click="$router.push({name:'article',params:{id:scope.row._id}})" type="text" size="small">查看</el-button>
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
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
        this.$http.get('/articleCount').then((res)=>{
            this.page = res.data.length
        })
        this.getData(0)
    },
    methods:{
        handleClick(row){
            this.$router.push({
                name:'articleRevisePage',
                params:{
                    id:row._id
                }
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
                            category:articleList[i].category
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