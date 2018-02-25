import {mapState} from 'vuex'
export default {
	computed: {
		...mapState({
			mx_userMsg: state => state.auth.user
		})
	},
}