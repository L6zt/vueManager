import {normalGet, post, upload, baseUrl, $2data} from "../utils/ajax";
export default {
	namespaced: true,
	state: {
		user: null
	},
	mutations: {
		postUserMsg (state, playLoad) {
			state.user = playLoad
		}
	},
	actions: {
		getRandCode({commit, state}, playLoad) {
			return normalGet({
				url: `${baseUrl}/createToken/randomCode`
			})
		},
		getUserMsg ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/auth/getUserMsg`,
			}).then(({flag, data, errMsg}) => {
				if (flag === 1) {
					commit('postUserMsg', data)
				}
				return {flag, data, errMsg}
			})
		},
		
		postLogin ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/auth/login`,
				params: playLoad
			}).then(({flag, data, errMsg}) => {
				if(errMsg) {
					throw (errMsg)
				} else {
					console.log(data)
					commit('postUserMsg', data)
					return {flag, data}
				}
			})
		},
		postChangePwd ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/auth/changePwd`,
				params: playLoad
			})
		},
		uploadFile ({commit, state}, playLoad) {
			return upload({
				url: `${baseUrl}/uploadFile/single`,
				params: $2data(playLoad)
			})
		}
	},
	getters: {
	
	}
}