import {mapState} from 'vuex'
export default {
	computed: {
		...mapState({
			mx_isLogin: state => !!state.auth.user,
			mx_userMsg: state => state.auth.user
		})
	},
	methods: {
		$mx_isLogin () {
			return !!this.$cookies('auth_koa')
		},
		$mx_getLoginMsg () {
			if (!this.mx_isLogin) {
				if(!this.$mx_isLogin()) {
					this.$router.push('/auth/login')
					return
				}
				this.$store.dispatch('auth/getUserMsg')
					.then(({flag, data, errMsg}) => {
						if (flag === 999) {
							this.$router.push('/auth/login')
						}
					})
			}
		}
	}
}