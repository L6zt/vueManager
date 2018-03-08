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
    import io from 'socket.io-client'
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState({
                isShowLoad: state => state.pageLoad
            })
        },
        components: {pageLoad},
        mounted () {
        	const socket = io('http://koa.jcmark.cn')
            socket.on('connect', () => {
            	console.log(socket.id)
            })
            socket.on('news', data => {
            	console.log(data)
            })
        }
    }
</script>
<style>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>