import {mapState} from 'vuex'
export default {
	computed: {
		...mapState({
			$mxIsLogin: state => !!state.auth.user,
			$mxUserMsg: state => state.auth.user
		})
	}
}