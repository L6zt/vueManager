<template>
    <section class="jc-person-msg-container">
        <el-dropdown>
            <span class="el-dropdown-link">
                <img :src="img" class="jc-person-msg-img">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <router-link to="/user/changePwd" class="user-link" tag="span">
                        密码修改
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <router-link to="/user/modifyMsg" class="user-link" tag="span">
                        个人信息
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <span class="user-link" @click="quit">
                        退出
                    </span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </section>
</template>
<script>
import {mapState} from 'vuex'
import defaultImg from  '../assert/img/logo.png'
export default {
	computed: {
        ...mapState({
            img: state =>(state.auth.user || {}).pic || defaultImg
        })
    },
	methods: {
		quit () {
            this.$store.dispatch('auth/quit')
                .then(({flag, data, errMsg}) => {
            	    if (flag === 1) {
            	    	this.$store.commit('clearAllState')
            	    	this.$router.push('auth/login')
                    }
                })
        }
    }
}
</script>
<style lang="scss">
@import "../assert/css/index";
.jc-person-msg-container {
    display: inline-block;
    padding: 5px 0;
    .el-dropdown-link {
        @include clear-fix;
        cursor: pointer;
    }
    .el-icon-arrow-down {
        vertical-align: middle;
    }
    .jc-person-msg-img {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        vertical-align: middle;
        border: 1px solid $border-normal-color;
        transition: all 300ms ease;
        &:hover {
            transform: rotate(180deg);
        }
    }
    .user-link {
        text-decoration: none;
    }
}
</style>