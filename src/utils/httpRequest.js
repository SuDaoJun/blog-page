import { baseURL } from '@/utils';
import store from '@/store';
const install = (Vue, vm) => {
	// 此为自定义配置参数
	Vue.prototype.$u.http.setConfig({
    baseUrl: baseURL,
    dataType: 'json',
    showLoading: false, // 是否显示请求中的loading
    loadingText: '努力加载中~', // 请求loading中的文字提示
    loadingTime: 2000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
    originalData: true, // 是否在拦截器中返回服务端的原始数据
    loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
	});
	
	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {
		// 引用token
		// 方式一，存放在vuex的token，假设使用了uView封装的vuex方式
    // 见：https://uviewui.com/components/globalVariable.html
		config.header.Authorization = "Bearer " + vm.vuex_token;
		
		// 方式二，如果没有使用uView封装的vuex方法，那么需要使用$store.state获取
		// config.header.token = vm.$store.state.token;
		
		// 方式三，如果token放在了globalData，通过getApp().globalData获取
		// config.header.token = getApp().globalData.username;
		
		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
    // const token = uni.getStorageSync('token');
    
		// 最后需要将config进行return
		return config;
		// 如果return一个false值，则会取消本次请求
  }
  // 响应拦截，如配置，每次请求结束都会执行本方法
  Vue.prototype.$u.http.interceptor.response = (res) => {
    let statusCode = res.statusCode;
    if(statusCode  == 200 && res.data.code == '10000') {
      // res为服务端返回值，可能有code，result等字段
      // 如果配置了originalData为true，请留意这里的返回值
      return res.data;
    } else if(statusCode == 403) {
      // 假设403为token失效，这里跳转登录
      store.commit('$storeLife', {
        name: 'vuex_token',
        value: ''
      })
      store.commit('$storeLife', {
        name: 'vuex_userInfo',
        value: {}
      })
      vm.$u.toast('token失效，请重新登录');
      // vm.$u.vuex('vuex_token', '');
      // vm.$u.vuex('vuex_userInfo', {});
      return false;
    } else {
      vm.$u.toast(res.data.msg || '服务器错误');
      // 如果返回false，则会调用Promise的reject回调，
      // 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
      return false;
    }
  }
}

export default {
	install
}