<template>
    <div id='admin_nav'>
        <ul class='nav_container'>
            <router-link :to="{name:'adminInfo'}">
                <li>
                    <i class='el-icon-menu'></i>
                    <span style='margin-left:20px;'>首页</span>
                </li>
            </router-link>
            <router-link :to="{name:'adminAddarticle'}">
                <li>
                    <i class='el-icon-edit'></i>
                    <span style='margin-left:20px;'>发布文章</span>
                </li>
            </router-link>
            <router-link :to="{name:'ArticleRevise'}">
            <li>
                <i class='el-icon-refresh'></i>
                <span style='margin-left:20px;'>修改文章</span>
            </li>
            </router-link>
            <router-link :to="{name:'adminRemoveArticle'}">
            <li>
                <i class='el-icon-delete'></i>
                <span style='margin-left:20px;'>删除文章</span>
            </li>
            </router-link>
            <router-link :to="{name:'adminUserOperate'}">
            <li>
                <i class='el-icon-search'></i>
                <span style='margin-left:20px;'>用户操作</span>
            </li>
            </router-link>
            <router-link :to="{name:'adminCategory'}">
            <li>
                <i class='el-icon-setting'></i>
                <span style='margin-left:20px;'>板块设置</span>
            </li>
            </router-link>
        </ul>
    </div>
</template>
<script>
    export default{
        name:'adminNav'
    }
</script>
<style lang="scss" scoped>
    a{
        text-decoration:none;
    }
    #admin_nav{
        .nav_container{
            width:100%;
            height: 94vh;
            background: rgb(87, 87, 87);
            li:first-child{
                padding-top:10px;
            }
            li{
                height:50px;
                font-size:1em;
                color:white;
                &:hover{
                    background: rgb(100,100,100);
                    cursor: pointer;
                }
                text-align: left;
                padding-top:20px;
                padding-left:40px;
                }
            }
        }
</style>
