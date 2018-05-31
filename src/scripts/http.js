import axios from 'axios'
import qs from 'qs'
import url from './url'
axios.defaults.baseURL = url.baseURL
url.isTest || (axios.defaults.withCredentials = true)
axios.interceptors.request.use(function (config) {
  config.data = config.data || {}
  let deviceId = (window.api && window.api.deviceId) || 'TestDeviceID'
  let UserKey = localStorage.getItem('UserKey') || ''
  if (config.isUpload) {
    config.data.append('DeviceID', deviceId)
    config.data.append('UserKey', UserKey)
  } else {
    config.data.DeviceID = deviceId
    config.data.UserKey = UserKey
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
export default axios