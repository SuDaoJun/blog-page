import { Message } from 'element-ui';
import qs from "qs";
import { baseURL } from '@/utils/index'

const tip = msg => {
  Message.warning({
    message: msg
   });
}
const errorHandle = (status, other) => {
  switch (status) {
      case 403:
          tip('登录过期，请重新登录');
          break;
      case 404:
          tip('网络请求不存在');
          break;
      case 500:
          tip('服务器错误');
          break;
      default:
          tip('请求失败');
  }
}

export default function ({ $axios, redirect, store }) {
  $axios.defaults.baseURL = baseURL;
  // request拦截器
  $axios.onRequest(config => {
    if((config.method === 'post' ||  config.method === 'put') && config.headers['Content-Type'] == "application/x-www-form-urlencoded;charset=UTF-8"){
        config.data=qs.stringify(config.data);
    }
    if (process.browser) {
      if(sessionStorage.getItem('token')){
        config.headers['Authorization'] = sessionStorage.getItem('token')
      }
    }
    return config;
  });
  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    res => {
      if(res.status === 200) {
          return Promise.resolve(res.data);
        } else {
          tip('数据获取失败');
          return Promise.reject(res)
        }
    },
    error => {
      const { response } = error;
      if (response) {
        // 请求已发出，但是不在200的范围 
        errorHandle(response.status, response.data.errMsg);
        return Promise.reject(response);
      }
    })
}