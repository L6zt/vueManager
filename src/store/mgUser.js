import {normalGet, post, upload, baseUrl, $2data} from "../utils/ajax";
export default {
	namespaced: true,
	state: {
		userList: null,
	},
	mutations: {
		setUserList (state, playLoad) {
			state.userList = playLoad
		},
		editUser (state, {index, item}) {
			state.userList.splice(index, 1, item)
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
		},
		editUser ({commit, state}, playLoad) {
			const {params, index, item} = playLoad
			return post({
				url: `${baseUrl}/user/editor`,
				params,
			}).then(({flag, data, errMsg}) => {
					commit('editUser', {
						index,
						item
					})
				return {data, flag, errMsg}
			})
		}
	}
}