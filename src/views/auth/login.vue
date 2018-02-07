<template>
    <div>
        login
        <router-link to="/">index</router-link>
    </div>
</template>
<script>
import pageLoad from '../../mixin/pageLoad'
export default {
	mixins: [pageLoad],
	mounted () {
		setTimeout(() => {
			this.$store.commit('changeLoadStatus', false)
		}, 1000)
	}
}
</script>