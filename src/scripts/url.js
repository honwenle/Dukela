let baseURL, isTest
isTest = (location.href.indexOf('isTest') > -1 || location.host.indexOf('localhost') > -1)
if (isTest) {
  baseURL = 'http://192.168.42.165/App/'
} else {
  // baseURL = 'http://weixin.doukela.com:10014/App/'
  baseURL = 'http://weixin.doukela.com/App/'
}
export default {
  imgUrl: 'http://admin.doukela.com',
  baseURL,
  isTest
}