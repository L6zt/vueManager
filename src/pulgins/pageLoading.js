import component from '../components/pageLoad.vue'
const PageLoad  = Object.create(null)
pageLoad.install = (Vue, options) => {
	Vue.prototype.$pageLoad = () => {
		const elem = document.createElement('div')
	}
}