import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import mgUser from './mgUser'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		auth,
		mgUser
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