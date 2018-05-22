import axios from 'axios'
import qs from 'qs'
import url from './url'
axios.defaults.baseURL = url.baseURL
url.isTest || (axios.defaults.withCredentials = true)
axios.interceptors.request.use(function (config) {
  if (config.data) {
    config.data.DeviceID = (window.api && window.api.deviceId) || 'TestDeviceID'
    config.data.UserKey = localStorage.getItem('UserKey') || ''
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default axios