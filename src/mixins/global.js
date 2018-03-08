import {mapState} from 'vuex'
import {userDefaultImg} from '../assert/js/config'
export default {
	computed: {
		...mapState({
			$gMxUserMsg: state => state.auth.user
		}),
		userDefaultImg () {
			return userDefaultImg
		}
	},
	methods: {
		$gMxpageLoad (flag) {
			this.$store.commit('pageLoad', flag)
		}
	}
}