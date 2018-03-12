<script>
    import manager from './manager.vue'
    import solve from './solve.vue'
    export default {
        render(h) {
    		const vNode = this.$route.params.power === "solve" ?  h('solve') : h('manager')
    		return vNode
        },
        components: {manager, solve}
    }
</script>
