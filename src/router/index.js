import Vue from 'vue'
import Router from 'vue-router'


const home = resolve => require(['@/views/home/home.vue'], resolve)
const article = resolve => require(['@/views/article/article.vue'], resolve)
const articleDetail = resolve => require(['@/views/article/articleDetail.vue'], resolve)
const archive = resolve => require(['@/views/archive/archive.vue'], resolve)
const project = resolve => require(['@/views/project/project.vue'], resolve)
const message = resolve => require(['@/views/message/message.vue'], resolve)
const redirect = resolve => require(['@/views/redirect/redirect.vue'], resolve)

Vue.use(Router)

const constantRoutes = [
  {
    path: '/',
    name: 'home',
    component: home,
    redirect: '/article',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/article',
        name: 'article',
        component: article,
        meta: {
          title: '文章列表'
        }
      },
      {
        path: '/article/archive',
        name: 'archive',
        component: archive,
        meta: {
          title: '文章归档'
        }
      },
      {
        path: '/project',
        name: 'project',
        component: project,
        meta: {
          title: '项目管理'
        }
      }
    ]
  },
  {
    path: '/articleDetail',
    name: 'articleDetail',
    component: articleDetail,
    meta: {
      title: '文章详情'
    }
  },
  {
    path: '/message',
    name: 'message',
    component: message,
    meta: {
      title: '留言'
    }
  },
  {
    path: '/redirect/:path*',
    name: 'redirect',
    component: redirect
  },
  {
    path: '*', 
    redirect: '/'
  }
]

const createRouter = () => new Router({
  mode: 'history',
  routes: constantRoutes
})

const router = createRouter()

export default router
