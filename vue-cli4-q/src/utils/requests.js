const axios = require('axios')

axios.defaults.timeout = 5000; //响应时间


axios.interceptors.request.use(config => {
  config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
  return config;
})



const $http = {
  post: function(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  ////返回一个Promise(发送get请求)
  get: function(url, param) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
          params: param
        })
        .then(response => {
          resolve(response)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
export default $http;
