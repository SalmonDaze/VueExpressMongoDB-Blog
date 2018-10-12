<template>
    <div id='admin_container'>
        <el-container>
            <el-header>
                <navbar>
                    <template slot='header'>
                        <span><img src='../../assets/monisha.png' style='height:40px;vertical-align:middle;margin-right:10px;'>后台系统</span>
                    </template>
                    <template slot='footer'>
                        <el-button type="primary" plain class='back' @click="$router.push('/')">返回主页</el-button>
                    </template>
                </navbar>
            </el-header>
            <el-container>
                <el-aside width="200px"><adminNav class='admin_nav'></adminNav></el-aside>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>
    
</template>
<script>
import adminNav from '../../components/adminNav.vue'
import navbar from '../../components/navbar.vue'
export default{
    name:'admin_index',
    components:{
        adminNav,
        navbar
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
    .back{
        margin-top:15px;
    }
    .admin_nav{
    }
    #admin_container{
        .admin_right{
        }
    }
</style>
