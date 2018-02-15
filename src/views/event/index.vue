<template>
    <div class="event-main-container">
        event
    </div>
</template>
<script>
import auth from '../../mixin/pageLoad'
import pageLoad from '../../mixin/pageLoad'
export default {
	data () {
	    return {}
    },
    mixins: [auth, pageLoad],
    mounted () {
		setTimeout(() => {
			this.$store.commit('changeLoadStatus', false)
        }, 1000)
    }
}
</script>
<style>

</style>