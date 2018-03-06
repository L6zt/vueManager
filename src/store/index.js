import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import user from './user'
import event from './event'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		auth,
		user,
		event
	},
	state: {
		pageLoad: false
	},
	mutations: {
		pageLoad (state, flag) {
			this.state.pageLoad = flag
		},
		clearAllState (state, flag) {
			state.auth.user = null
			state.event.eventList =  {}
			state.user.userList =[]
		}
	},
	actions: {
	
	}
})
export default  store