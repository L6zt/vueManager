<template>
    <el-container>
        <el-aside  width="220px">
            <el-menu
                    class="slide-menu-left"
                    :router="true"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :default-active="activeNav"
            >

                <el-menu-item index="/">
                    <i class="el-icon-tickets"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="nav01" v-if="($gMxUserMsg || {}).role !== 3">
                    <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                    <el-menu-item index="/user/manager" >用户列表</el-menu-item>
                </el-submenu>
                <el-submenu index="nav02">
                    <template slot="title"><i class="el-icon-menu"></i>事件管理</template>
                    <el-menu-item index="/event/manager" v-if="($gMxUserMsg || {}) .role < 3">我的事件</el-menu-item>
                    <el-menu-item index="/event/solve" v-else>我的事件</el-menu-item>
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
import personMsg from '../components/personMsg.vue'
export default {
	data () {
		return {}
    },
    computed: {
		eventNav () {
			const {role} = this.$gMxUserMsg || {}
			switch (role) {
                case undefined: {
                	return '/event'
                }
                case 1 :
                case 2 : {
	                return '/event/manager'
                }
                default: {
                	return '/event/solve'
                }
            }
        },
		activeNav () {
			let {path} = this.$route
            if ((/\/event\/*?/).test(path)) {
				path = this.eventNav
            }
            return path
        }
    },
	mounted () {
		setTimeout(() => {
			this.$gMxpageLoad(false)
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
