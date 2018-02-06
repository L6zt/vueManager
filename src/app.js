import Vue from 'vue'
import index from './views/index.vue'
const app = new Vue({
	render(h) {
		return h('index')
	},
	components: {index}
})
app.$mount('#app')