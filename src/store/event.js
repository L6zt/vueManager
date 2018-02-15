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
		}
	}
}