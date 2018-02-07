import Vue from 'vue'
import layout from './views/layout.vue'
import store from './store'
import Element from 'element-ui'
import router from './router/index'
const app = new Vue({
	router,
	store,
	render(h) {
		return h('layout')
	},
	components: {layout}
})
app.$mount('#app')