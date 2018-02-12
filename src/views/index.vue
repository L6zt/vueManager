<template>
    <el-container>
        <el-aside  width="200px">
            <el-menu :default-openeds="['1']" class="slide-menu-left">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                    <el-menu-item index="user-list">管理用户</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>事件</template>
                    <el-menu-item index="event-list">事件列表</el-menu-item>
                    <el-menu-item index="event-mg-list">管理人事件</el-menu-item>
                    <el-menu-item index="event-solve-list">维修人事件</el-menu-item>
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
	mixins: [pageLoad, auth],
    created () {
        this.$mx_getLoginMsg()
    },
	mounted () {
		setTimeout(() => {
			this.$store.commit('changeLoadStatus', false)
		}, 1000)
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
