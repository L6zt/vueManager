<template>
    <div class="event-main-container">
        event
    </div>
</template>
<script>
import pageLoad from '../../mixin/pageLoad'
export default {
	data () {
	    return {}
    },
    mixins: [pageLoad],
    mounted () {
		setTimeout(() => {
			this.$store.commit('changeLoadStatus', false)
        }, 1000)
    }
}
</script>
<style>

</style>