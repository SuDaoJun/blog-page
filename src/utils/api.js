// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作

const install = (Vue, vm) => {
  const user = {
    statementList(params = {}) {
      return vm.$u.get('/blogPage/statement/list', params);
    }
  }
  const article = {
    articleList(params) {
      return vm.$u.get('/blogPage/article/list', params);
    },
    articleRandom(params){
      return vm.$u.get('/blogPage/statistics/randomArticle', params);
    }
  }
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
    user,
    article
  };
}

export default {
	install
}