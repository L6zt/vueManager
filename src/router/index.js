import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import cookies from 'js-cookie'
Vue.use(VueRouter)
const routes = [
	{path: '/', component: () => import('../views/index.vue'),
	children: [
		{path: '/', component: () => import('../views/defaultView.vue'), meta: {
			auth: true,
			name: 'index'
		}},
		{path: 'user/manager', component: () => import('../views/user/manager.vue'), meta: {
			auth: true,
			name: 'userManager'
		}},
		{path: 'event/manager', component: () => import('../views/event/manager.vue'), meta: {
			auth: true,
			name: 'eventManager'
			
		}},
		{path: 'event/solve', component: () => import('../views/event/solve.vue'), meta: {
			auth: true,
			name: 'eventSolve'
		}},
		{path: 'event/detail/:id', component: () => import('../views/event/detail.vue'), meta: {
			auth: true
		}, name: 'eventDetail'}
	]
	},
	{path: '/auth', component: () => import('../views/auth/layout.vue'),
		children: [
			{path: 'login', component: () => import('../views/auth/login.vue'), meta: {
				auth: true
			}, name: 'authLogin'}
		]
	},
	{path: '/profile', component: () => import('../views/profile/layOut.vue'),
		children: [
			{path: 'changePwd', component: () => import('../views/profile/changePwd.vue'), mata: {
				auth: true
			}, name: 'profile/changePwd'},
			{path: 'modifyMsg', component: () => import('../views/profile/modifyMsg.vue'), meta: {
				auth: true
			}, name: 'profile/modifyMsg'},
			{path: '*', component: () => import('../views/404.vue')}
		]
	},
	{path: '*', component: () => import('../views/404.vue')}
]
const router =  new VueRouter({routes})
// 用户鉴权 逻辑
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
					return Promise.reject()
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
	store.commit('pageLoad', true)
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
/*
	健忘的我，路由生命周期 函数 注解
	@1导航被触发。
	@2在失活的组件里调用离开守卫。
	@3调用全局的 beforeEach 守卫。
	@4在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
	@5在路由配置里调用 beforeEnter。
	@6解析异步路由组件。
	@7在被激活的组件里调用 beforeRouteEnter。
	@8调用全局的 beforeResolve 守卫 (2.5+)。
	@9导航被确认。
	@10调用全局的 afterEach 钩子。
	@11触发 DOM 更新。
	@12用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
*/

