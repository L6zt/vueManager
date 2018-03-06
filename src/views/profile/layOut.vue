<template>
    <div class="user-layout-container">
        <user-head></user-head>
        <section class="user-common-content">
            <aside class="user-left-menu">
                <section class="user-person-msg">
                    <img :src="src" alt="">
                    <span>{{(mx_userMsg || {}).name}}</span>
                </section>
                <section class="user-menu-item">
                    <i class="el-icon-edit"></i>
                    <router-link
                            to="/user/changePwd"
                            tag="span"
                            :class="{'is-active': $route.path === '/profile/changePwd'}"
                    >
                        修改密码
                    </router-link>
                </section>
                <section  class="user-menu-item">
                    <i class="el-icon-tickets"></i>
                    <router-link
                            to="/user/modifyMsg"
                            tag="span"
                            :class="{'is-active': $route.path === '/profile/modifyMsg'}"
                    >
                        修改个人信息
                    </router-link>
                </section>
            </aside>
            <div class="user-layout-container-content">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import userHead from '../../components/user/userHeaed.vue'
import defaultImg from '../../assert/img/logo.png'
export default {
	data () {
		return {
        }
    },
    computed: {
        ...mapState({
            src: state => (state.auth.user || {}).pic || defaultImg
        })
    },
    components:{userHead}
}
</script>
<style lang="scss">
@import "../../assert/css/index";
.user-layout-container {
    .user-common-content {
        @include main-container;
        margin:30px auto 0;
        @include clear-fix;
    }
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
                box-shadow: 0 0 3px $box-shadow-dark-color;
            }
            text-align: center;
            font-size: $font-size-normal-title;
        }
        .user-menu-item {
            position: relative;
            padding: 20px;
            text-align: left;
            span {
                cursor: pointer;
                margin-left: 5px;
                &.is-active{
                   color: $nav-active-color;
                }
            }
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