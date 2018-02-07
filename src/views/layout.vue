<template>
    <div id="app">
        <page-load
          :isShow="isShowLoad"
        ></page-load>
        <section>头部</section>
        <router-view></router-view>
    </div>
</template>
<script>
    import pageLoad from '../components/pageLoad.vue'
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