import Vue from 'vue'
import VueRouter from 'vue-router'
import loadBar from '../components/pageLoad.vue'
let vmBar
Vue.use(VueRouter)
const routes = [
	{path: '/', component: () => import('../views/index.vue')},
	{path: '/auth', component: () => import('../views/auth/layout.vue'),
		children: [
			{path: 'login', component: () => import('../views/auth/login.vue')}
		]
	},
	{path: '/user', component: () => import('../views/user/layOut.vue'),
		children: [
			{path: 'changePwd', component: () => import('../views/user/changePwd.vue')},
			{path: 'modifyMsg', component: () => import('../views/user/modifyMsg.vue')},
			{path: '*', component: () => import('../views/404.vue')}
		]
	},
	{path: '*', component: () => import('../views/404.vue')}
]
const router =  new VueRouter({routes})
// router.onReady(() => {
// 	const elem = document.createElement('div')
// 	// extend
// 	document.body.appendChild(elem)
// 	const vm = new Vue({
// 		name: 'extraContainer',
// 		data () {
// 			return {
// 				isShow: false
// 			}
// 		},
// 		components: {loadBar},
// 		render (h) {
// 			const {isShow} = this
// 			return  h('loadBar', {
// 				props: {
// 					isShow
// 				},
// 			})
// 		}
// 	})
// 	vm.$mount(elem)
// 	vmBar = vm
// 	router.beforeEach((to, from, next) => {
// 		vm.isShow = true
// 		next()
// 	})
// 	router.beforeResolve((to, from, next) => {
// 		console.log('xxx')
// 		vm.isShow = false
// 		next()
// 	})
// })
export  default  router
