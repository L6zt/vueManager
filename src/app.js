import Vue from 'vue'
import layout from './views/layout.vue'
import store from './store'
import Element from 'element-ui'
import './assert/css/main.scss'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/index'
import globalMixin from './mixins/global'
import {pulginsFn} from './pulgins/index.js'
// 注入css 文件
import './components/style/comPStyle'
pulginsFn(Vue)
Vue.use(Element)
Vue.mixin(globalMixin)
const app = new Vue({
	router,
	store,
	render(h) {
		return h('layout')
	},
	components: {layout}
})
app.$mount('#app')