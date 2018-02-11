<template>
    <div class="user-layout-container">
        <aside class="user-left-menu">
            <section class="user-person-msg">
                <img src="../../assert/img/logo.png" alt="">
                <span>{{(mx_userMsg || {}).name}}</span>
            </section>
            <section class="user-menu-item">
                <i class="el-icon-edit"></i>
                <router-link to="/user/fpwd" tag="span">
                    修改密码
                </router-link>
            </section>
            <section  class="user-menu-item">
                <i class="el-icon-tickets"></i>
                <router-link to="/user/editor" tag="span">
                    修改个人信息
                </router-link>
            </section>
        </aside>
        <div class="user-layout-container-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import auth from '../../mixin/auth'
export default {
	data () {
		return {
        }
    },
    mixins: [auth],
    created () {
		this.$mx_getLoginMsg()
    }
}
</script>
<style lang="scss">
@import "../../assert/css/index";
.user-layout-container {
    position: relative;
    width: 1100px;
    margin: 30px auto;
    @include clear-fix;
    .user-left-menu {
        position: relative;
        float: left;
        width: 200px;
        box-shadow: 0 0 3px $box-shadow-dark-color;
        padding: 30px 0;
        .user-person-msg {
            img {
                display: block;
                width: 100px;
                height: 100px;
                border-radius: 100%;
                margin: 0 auto;
            }
            text-align: center;
            font-size: $font-size-normal-title;
        }
        .user-menu-item {
            position: relative;
            padding: 20px;
            text-align: left;
        }
    }
    .user-layout-container-content {
        position: relative;
        float: right;
        width: 750px;
        min-height: 750px;
        padding: 20px;
        box-shadow: 0 0 3px $box-shadow-dark-color;


    }
}
</style>