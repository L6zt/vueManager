import {normalGet, post, upload, baseUrl, $2data} from "../utils/ajax"
export default {
	namespaced: true,
	state: {
		eventList: []
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
		},
		getEventComment ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/event/getEventComment`,
				params: playLoad
			}).then(({data, flag, errMsg}) => {
				return {data, flag, errMsg}
			})
		},
		postEventComment ({commit, state}, playLoad) {
			return post({
				url: `${baseUrl}/event/post/comment`,
				params: playLoad
			}).then(({data, flag, errMsg}) => {
				return {data, flag, errMsg}
			})
		}
	}
}