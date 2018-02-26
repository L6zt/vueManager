<template>
    <el-container>
        <el-aside  width="220px">
            <el-menu :default-openeds="['1', '2']" class="slide-menu-left" :router="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                <el-submenu index="1" v-if="(mx_userMsg || {}).role !== 3">
                    <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                    <el-menu-item index="/mgUser" >用户列表</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>事件管理</template>
                    <el-menu-item index="/mgEvent" v-if="(mx_userMsg || {}) .role < 3">我的事件</el-menu-item>
                    <el-menu-item index="/solveEvent" v-else>我的事件</el-menu-item>
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
import personMsg from '../components/personMsg.vue'
export default {
	data () {
		return {}
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
    .slide-menu-left {
        position: fixed;
        width: 220px;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
    }
</style>
