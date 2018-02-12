<template>
    <section class="user-common-header">
        <router-link
                tag="span"
                class="el-icon-news user-go-home"
                to="/"
        ></router-link>
        <nav>
            个人中心
        </nav>
    </section>
</template>
<style lang="scss">
    @import "../../assert/css/index.scss";
    .user-common-header {
        position: relative;
        padding: 20px 0;
        font-size: $font-size-big-title;
        background: $head-color;
        color: #fff;
        letter-spacing: 3px;
        line-height: 1;
        nav {
            @include main-container;
            text-align: center;
        }
        .user-go-home {
            float: left;
            margin-left: 10px;
            cursor: pointer;
        }
    }
</style>