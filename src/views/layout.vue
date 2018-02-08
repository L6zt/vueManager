<template>
    <div id="app">
        <page-load
          :isShow="isShowLoad"
        ></page-load>
        <router-view></router-view>
    </div>
</template>
<script>
    import pageLoad from '../components/pageLoad.vue'
    import 'element-ui/lib/theme-chalk/index.css'
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState({
                isShowLoad: state => state.pageLoad
            })
        },
        components: {pageLoad}
    }
</script>
<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>