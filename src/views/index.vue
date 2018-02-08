<template>
    <div class="special-cn">
      index
        <router-link to="/auth/login">login</router-link>
    </div>
</template>
<script>
import pageLoad from '../mixin/pageLoad'
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
<style lang="scss">
    .special-cn {
        display: flex;
    }
</style>
