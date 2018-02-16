import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import mgUser from './mgUser'
import event from './event'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		auth,
		mgUser,
		event
	},
	state: {
		pageLoad: false
	},
	mutations: {
		changeLoadStatus (state, flag) {
			this.state.pageLoad = flag
		},
		clearAllState (state, flag) {
			state.auth.user = null
			state.event.eventList  =  {}
			state.mgUser.userList =[]
		}
	},
	actions: {
	
	}
})
export default  store