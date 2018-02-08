// 是否对应 后端状态
import axios from 'axios'
export const get = ({url, params}) =>{
	return axios({
		url,
		method: 'get',
		params
	}).then(({data: {flag, data, errMsg}}) => {
		if (errMsg) {
			throw (errMsg)
		} else {
			return {flag, data}
		}
	})
}
export const post = ({url, params}) => {
	return axios({
		url,
		method: 'post',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		data: params,
		transformRequest: [
			(data, headers) => {
				let cs = ''
				for (let k in data) {
					cs = `${cs}${k}=${encodeURIComponent(data[k])}&`
				}
				return cs
			}
		]
	}).then(({data: {flag, data, errMsg}}) => {
		if (errMsg) {
			throw (errMsg)
		} else {
			return {flag, data}
		}
	})
}
export const upload = ({url, params}) => {
	return axios({
		url,
		method: 'post',
		headers: {
			'Content-Type': 'multipartform-data'
		},
		data: params,
	}).then(({data: {flag, data, errMsg}}) => {
		if (errMsg) {
			throw (errMsg)
		} else {
			return {flag, data}
		}
	})
}
export const formData = (data) => {
	if (typeof window.formData === "undefined") {
		throw (new Error('not support formData'))
	}
	const nData = new formData()
	for (let k in data) {
		nData.append(k, data[k])
	}
	return formData()
}