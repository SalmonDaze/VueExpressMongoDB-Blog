<template>
    <div id='admin_container'>
        <el-container>
            <el-header>
                <navbar>
                    <template slot='header'>
                        <span style='color:white;'><img src='../../assets/monisha.png' style='height:40px;vertical-align:middle;margin-right:10px;'>后台系统</span>
                    </template>
                    <template slot='footer'>
                        <el-button type="primary" plain class='back' @click="$router.push('/')">返回主页</el-button>
                    </template>
                </navbar>
            </el-header>
            <el-container>
                <el-aside width="200px"><adminNav class='admin_nav'></adminNav></el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
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
    .navbar{
        width:100%;
        
        .el-button{
            margin-top:10px;
        }
    }
    #admin_container{
        .el-aside{
            width:10%;
        }
        .el-main{
            height: 94vh;
        }
        .el-header{
            padding:0px;
            height: 6vh;
        }
    }
</style>
