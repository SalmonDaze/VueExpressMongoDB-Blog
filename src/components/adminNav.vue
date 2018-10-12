<template>
    <div id='admin_nav'>
        <ul class='nav_container'>
            <li>
                <i class='el-icon-menu'></i>
                <span style='margin-left:20px;'>首页</span>
            </li>
            <li>
                <i class='el-icon-edit'></i>
                <span style='margin-left:20px;'>发布文章</span>
            </li>
            <li>
                <i class='el-icon-refresh'></i>
                <span style='margin-left:20px;'>修改文章</span>
            </li>
            <li>
                <i class='el-icon-delete'></i>
                <span style='margin-left:20px;'>删除文章</span>
            </li>
            <li>
                <i class='el-icon-search'></i>
                <span style='margin-left:20px;'>用户操作</span>
            </li>
            <li>
                <i class='el-icon-setting'></i>
                <span style='margin-left:20px;'>分类设置</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:'adminNav'
    }
</script>
<style lang="scss" scoped>
    #admin_nav{
        .nav_container{
            height: 100vh;
            background: rgb(87, 87, 87);
            li:first-child{
                padding-top:1   0px;
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
                padding-top:18px;
                padding-left:40px;
                }
            }
        }
</style>
