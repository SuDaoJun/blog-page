import Axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';
import router from '@/router'

export let baseURL = process.env.NODE_ENV == 'development'?'http://localhost:3000':'http://sdjBlog.cn:3000'
let axios = Axios.create({
    baseURL,
    // timeout: 1000 * 10,
    withCredentials: false,
    // headers: { "Content-Type": "application/json;charset=UTF-8" }
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
});
/** 
 * 提示函数 
 * 显示一秒后关闭
 */
const tip = msg => {
  Message.warning({
    message: msg
   });
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/'
    });
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
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

// 请求拦截器
axios.interceptors.request.use(
    config => {
      if((config.method === 'post' ||  config.method === 'put') && config.headers['Content-Type'] == "application/x-www-form-urlencoded;charset=UTF-8"){
          config.data=qs.stringify(config.data);
      }
      if(sessionStorage.getItem('token')){
        config.headers['Authorization'] = sessionStorage.getItem('token')
      }
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
)

// 响应拦截器
axios.interceptors.response.use(
    // 请求成功
    (res) => {
        if(res.status === 200) {
          return Promise.resolve(res.data);
        } else {
          tip('数据获取失败');
          return Promise.reject(res)
        }
    },
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在200的范围 
            errorHandle(response.status, response.data.errMsg);
            return Promise.reject(response);
        }
    }
)

export default {
  axios
};