 const install = (Vue, vm) => {
  const navigateTo = (path = '', params = {}) => { 
    vm.$u.route({
      type: 'navigateTo',
      url: path,
      params: params
    })
  }
  const redirectTo = (path = '', params = {}) => {
    vm.$u.route({
      type: 'redirectTo',
      url: path,
      params: params
    })
  }
  const switchTab = (path = '', params = {}) => {
    vm.$u.route({
      type: 'switchTab',
      url: path,
      params: params
    })
  }
  const reLaunch = (path = '', params = {}) => {
    vm.$u.route({
      type: 'reLaunch',
      url: path,
      params: params
    })
  }
  
  const navigateBack = (delta = 1) => {
    //可以存储上一页的查询参数？？
    vm.$u.route({
      type: 'navigateBack',
      delta: delta
    })
  }
  vm.$u.routePath = {redirectTo, navigateTo, navigateBack, reLaunch, switchTab}
}

export default {
	install
}