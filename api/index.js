/** 
 * api接口的统一封装
 */
import axiosObj from '@/api/axios';
let axios = axiosObj.axios;

const user = {
  login(params) {
    return axios.post('/blogPage/user/login', params)
  },
  register(params) {
    return axios.post('/blogAdmin/user/register', params)
  },
  statementList(params) {
    return axios.get('/blogPage/statement/list', { params })
  },
}
const statistics = {
  tagList(params) {
    return axios.get('/blogPage/statistics/tagList', { params })
  },
  articleArchive(params){
    return axios.get('/blogPage/statistics/articleArchive', { params })
  },
  randomMessage(params){
    return axios.get('/blogPage/statistics/randomMessage', { params })
  },
}
const article = {
  articleList(params) {
    return axios.get('/blogPage/article/list', { params })
  },
  articleDetail(params) {
    return axios.get('/blogPage/article/detail', { params })
  },
  articleLike(params) {
    return axios.put('/blogAdmin/article/like',  params )
  },
  articleComment(params) {
    return axios.post('/blogAdmin/comment/add',  params )
  },
  articleCommentList(params) {
    return axios.get('/blogPage/comment/list', { params })
  },
  replyCommentAdd(params){
    return axios.post('/blogAdmin/replyComment/add',  params )
  },
}
const project = {
  projectList(params) {
    return axios.get('/blogPage/project/list', { params })
  }
}
const link = {
  linkList(params) {
    return axios.get('/blogPage/link/list', { params })
  }
}
const message = {
  messageAdd(params){
    return axios.post('/blogPage/message/add',  params )
  }
}

export default {
  user,
  statistics,
  article,
  project,
  link,
  message
}