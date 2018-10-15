<template>
    <div class='article_list'>
            <div v-if='!this.$route.params.id'>
                <template>
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="title" label="文章名称" width="180">
                    </el-table-column>
                    <el-table-column prop="author" label="作者" width="180">
                    </el-table-column>
                    <el-table-column prop="content" label="文章内容">
                    </el-table-column>
                    <el-table-column prop="revise" label="操作" width='150'>
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </template>
                <el-pagination layout="prev, pager, next" :total="page" @current-change='search(pages)'>
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
            page:100,
            currentPage:0,
        }
    },
    created(){
        this.$http({
            url:'http://localhost:3000/getArticle',
            method:'POST',
            data:{
                page
            },
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
            }).then((res)=>{
                let articleList = res.data
                this.page = Math.ceil(articleList.length / 10) * 10
                console.log(articleList)
                for(let i=0;i<articleList.length;i++){
                    this.tableData.push({
                        author:articleList[i].author,
                        content:articleList[i].content,
                        title:articleList[i].title,
                        _id:articleList[i]._id,
                })
            }
        })
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
        search(pages){
            console.log(pages)
            this.currentPage = page
            this.$http({
                url:'http://localhost:3000/getArticle',
                method:'POST',
                data:{
                    page:page
                },
                header:{
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).then(()=>{}).catch((e)=>{
                console.log(e)
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