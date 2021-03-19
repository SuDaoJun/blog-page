// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作

const install = (Vue, vm) => {
  const user = {
    userLogin(params = {}) {
      return vm.$u.post('/blogPage/user/login', params);
    },
    userUpdate(params = {}) {
      return vm.$u.put('/blogAdmin/user/update', params);
    },
    userPwdModify(params = {}) {
      return vm.$u.post('/blogAdmin/user/modifyPwd', params);
    },
    userRegister(params = {}) {
      return vm.$u.post('/blogAdmin/user/register', params);
    },
    statementList(params = {}) {
      return vm.$u.get('/blogPage/statement/list', params);
    }
  }
  const article = {
    articleList(params = {}) {
      return vm.$u.get('/blogPage/article/list', params);
    },
    articleDetail(params = {}) {
      return vm.$u.get('/blogPage/article/detail', params)
    },
    articleTagList(params = {}) {
      return vm.$u.get('/blogPage/statistics/tagList', params)
    },
    articleCommentList(params = {}) {
      return vm.$u.get('/blogPage/comment/list', params)
    },
    articleComment(params = {}) {
      return vm.$u.post('/blogAdmin/comment/add',  params)
    },
    replyCommentAdd(params = {}){
      return vm.$u.post('/blogAdmin/replyComment/add',  params )
    },
    articleLike(params = {}) {
      return vm.$u.put('/blogAdmin/article/like',  params)
    },
    articleRandom(params = {}){
      return vm.$u.get('/blogPage/statistics/randomArticle', params);
    },
    getUserHistory(params = {}){
      return vm.$u.get('/blogPage/statistics/userHistory', params);
    },
  }
  const message = {
    messageList(params = {}) {
      return vm.$u.get('/blogPage/message/list', params);
    },
    messageRandom(params = {}) {
      return vm.$u.get('/blogPage/statistics/randomMessage', params);
    },
    messageAdd(params = {}){
      return vm.$u.post('/blogPage/message/add',  params )
    },
  }
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
    user,
    article,
    message
  };
}

export default {
	install
}