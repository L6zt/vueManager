import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
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