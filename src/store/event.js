import {normalGet, post, upload, baseUrl, $2data} from "../utils/ajax"
export default {
	namespaced: true,
	state: {
		eventList: {}
	},
	mutations: {
	
	},
	actions: {
		getMgEventList ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/event/getList`,
				params: playLoad
			}).then(({flag, data, errMsg}) => {
				return {flag, data, errMsg}
			})
		},
		getSolveUserList ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/user/getWorkList`
			}).then(({flag, data, errMsg}) => {
				return {flag, data, errMsg}
			})
		},
		createEvent ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/event/create`,
				params: playLoad
			}).then(({data, flag, errMsg}) => {
				return {data, flag, errMsg}
			})
		}
	}
}