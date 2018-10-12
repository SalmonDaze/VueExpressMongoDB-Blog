<template>
    <div id='admin_container'>
        <navbar></navbar>
        <el-row>
            <el-col :span="4">
                <div class="sidebar">
                    <adminNav class='admin_nav'></adminNav>
                </div>
            </el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>
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
    }        
}
</script>
<style lang="scss" scoped>
    .sidebar{
    }
    .admin_nav{
        position: fixed;
        left:0;
        top:20;
        width:13%;
        z-index:999;
    }
    
</style>
