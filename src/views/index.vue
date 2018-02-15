<template>
    <el-container>
        <el-aside  width="200px">
            <el-menu :default-openeds="['1', '2']" class="slide-menu-left" :router="true">
                <el-submenu index="1" v-if="(mx_userMsg || {}).role !== 3">
                    <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                    <el-menu-item index="/mgUser" >用户列表</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>事件管理</template>
                    <el-menu-item index="/mgEvent">我的事件</el-menu-item>
                    <el-menu-item index="/solveEvent">我的事件</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
               <person-msg></person-msg>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import pageLoad from '../mixin/pageLoad'
import auth from '../mixin/auth'
import personMsg from '../components/personMsg.vue'
export default {
	data () {
		return {}
    },
	mixins: [auth],
    created () {
        this.$mx_getLoginMsg()
    },
	mounted () {
//		setTimeout(() => {
//			this.$store.commit('changeLoadStatus', false)
//		}, 1000)
	},
    components: {personMsg}
}
</script>
<style lang="scss">
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html, body {
        width: 100%;
        height: 100%;
    }
    .slide-menu-left {
        position: fixed;
        width: 200px;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
    }
</style>
