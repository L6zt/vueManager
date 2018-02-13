// 是否对应 后端状态
import axios from 'axios'
import {ajaxBaseUrl} from '../assert/js/config'
export const baseUrl = ajaxBaseUrl
export const normalGet = ({url, params = {}}) => {
	return axios({
		url,
		method: 'get',
		params
	}).then(({data}) => {
		return data
	})
}
export const get = ({url, params = {}}) =>{
	return axios({
		url,
		method: 'get',
		params
	}).then(({data: {flag, data, errMsg}}) => {
		return {flag, data, errMsg}
	})
}
export const post = ({url, params = {}}) => {
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
					data[k] && (cs = `${cs}${k}=${encodeURIComponent(data[k])}&`)
				}
				return cs
			}
		]
	}).then(({data: {flag, data, errMsg}}) => {
			return {flag, data, errMsg}
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
		return {flag, data, errMsg}
	})
}
export const $2data = (data) => {
	if (typeof window.FormData === "undefined") {
		throw (new Error('not support formData'))
	}
	const nData = new FormData()
	for (let k in data) {
		nData.append(k, data[k])
	}
	return nData
}