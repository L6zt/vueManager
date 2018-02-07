export default {
	beforeRouteLeave (form, to, next) {
		this.$store.commit('changeLoadStatus', true)
		next()
	}
}