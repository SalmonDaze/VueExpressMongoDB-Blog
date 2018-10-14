<template>
    <div>
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
        
    </div>
</template>

<script>
export default {
    name:'adminArticleRevise',
    data(){
        return{
            tableData: []
        }
    },
    created(){
        this.$http.get('http://localhost:3000/getArticle').then((res)=>{
            let articleList = res.data
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
            console.log(row)
        }
    }

}
</script>

<style lang="scss" scoped>

</style>