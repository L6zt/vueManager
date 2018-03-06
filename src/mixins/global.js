import {mapState} from 'vuex'
export default {
	computed: {
		...mapState({
			$gMxUserMsg: state => state.auth.user
		})
	},
	methods: {
		$gMxpageLoad (flag) {
			this.$store.commit('pageLoad', flag)
		}
	}
}