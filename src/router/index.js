import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import cookies from 'js-cookie'
Vue.use(VueRouter)
const routes = [
	{path: '/', component: () => import('../views/index.vue'),
	children: [
		{path: '/', component: () => import('../views/defaultView.vue')},
		{path: 'mgUser', component: () => import('../views/mgUser/index.vue'), meta: {
			auth: true
		}},
		{path: 'event', component: () => import('../views/event/index.vue'), meta: {
			auth: true
		}},
		{path: 'mgEvent', component: () => import('../views/event/mgEvent.vue'), meta: {
			auth: true
		}},
		{path: 'solveEvent', component: () => import('../views/event/solveEvent.vue'), meta: {
			auth: true
		}},
		{path: 'event/detail/:id', component: () => import('../views/event/eventDetail.vue'), meta: {
			auth: true
		}}
	]
	},
	{path: '/auth', component: () => import('../views/auth/layout.vue'),
		children: [
			{path: 'login', component: () => import('../views/auth/login.vue'), meta: {
				auth: true
			}}
		]
	},
	{path: '/user', component: () => import('../views/user/layOut.vue'),
		children: [
			{path: 'changePwd', component: () => import('../views/user/changePwd.vue'), mata: {
				auth: true
			}},
			{path: 'modifyMsg', component: () => import('../views/user//modifyMsg.vue'), meta: {
				auth: true
			}},
			{path: '*', component: () => import('../views/404.vue')}
		]
	},
	{path: '*', component: () => import('../views/404.vue')}
]
const router =  new VueRouter({routes})
const auth = (next) => {
	if (!!cookies('auth_koa')) {
		if (store.state.auth.user) {
			next()
			return
		}
		store.dispatch('auth/getUserMsg')
			.then(({flag, data, errMsg}) => {
				if (flag === 1) {
					 next()
				} else {
					next({
						path: '/auth/login'
					})
				}
			}).catch(e => {
			next({
				path: '/auth/login'
			})
		})
	} else {
		next('/auth/login')
	}
}
router.beforeEach((to, from, next) => {
	const {path, meta} = to
	store.commit('changeLoadStatus', true)
	if (to.meta.auth) {
		switch (path) {
			case '/auth/login':
				next()
			break
			default: {
				auth(next)
			}
		}
	} else {
		next()
	}
})
export  default  router
