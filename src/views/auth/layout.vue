<template>
    <div>
        <section class="auth-common-header">问题反馈</section>
        <router-view></router-view>
    </div>
</template>
<style lang="scss">
@import "../../assert/css/index";
.auth-common-header {
    height: $header-nav-height;
    line-height: $header-nav-height;
    color: #fff;
    text-align: center;
    font-size: $font-size-normal-title;
    background: $head-color;
    letter-spacing: 2px;
}
</style>