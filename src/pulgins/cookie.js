import cookies from 'js-cookie'
const Cookies = {}
Cookies.install = (Vue, options) => {
	Vue.prototype.$cookies = cookies
}
export default Cookies