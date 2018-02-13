import {normalGet, post, upload, baseUrl, $2data} from "../utils/ajax";
export default {
	namespaced: true,
	state: {
		userList: null,
	},
	mutations: {
		setUserList (state, playLoad) {
			state.userList = playLoad
		}
	},
	actions: {
		getUserList ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/user/getAllList`,
				params: playLoad
			}).then(({flag, data, errMsg}) => {
				if (flag === 1) {
					const {rows} = data
					commit('setUserList', rows)
				}
				return {flag, data, errMsg}
			})
		},
		createUser ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/user/create`,
				params: playLoad
			})
		},
		delUser ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/user/delete`,
				params: playLoad
			})
		}
	}
}