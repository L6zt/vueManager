<template>
    <section class="jc-person-msg-container">
        <el-dropdown>
            <span class="el-dropdown-link">
                <img src="../assert/img/logo.png" class="jc-person-msg-img">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <router-link to="/user/modifyMsg" class="user-link" tag="span">
                        个人信息
                    </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                    <router-link to="/user/changePwd" class="user-link" tag="span">
                        密码修改
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
export default {
	methods: {
		quit () {
            this.$store.dispatch('auth/quit')
                .then(({flag, data, errMsg}) => {
            	    if (flag === 1) {
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
    .el-dropdown-link {
        @include clear-fix;
        cursor: pointer;
    }
    .el-icon-arrow-down {
        vertical-align: middle;
    }
    .jc-person-msg-img {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        vertical-align: middle;
    }
    .user-link {
        text-decoration: none;
    }
}
</style>