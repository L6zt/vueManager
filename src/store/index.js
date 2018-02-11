import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		auth
	},
	state: {
		pageLoad: false
	},
	mutations: {
		changeLoadStatus (state, flag) {
			this.state.pageLoad = flag
		}
	},
	actions: {
	
	}
})
export default  store