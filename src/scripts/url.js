let baseURL, isTest
isTest = (location.href.indexOf('isTest') > -1 || location.host.indexOf('localhost') > -1)
if (isTest) {
  baseURL = 'http://192.168.42.28:8081/'
} else {
  baseURL = 'http://WeiXin.Doukela.com/WeiXin/'
}
export default {
  baseURL,
  isTest
}