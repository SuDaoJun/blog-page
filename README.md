## 前言

此 blog-page 项目是基于 vue 全家桶 + Elementui

## 效果

效果图：


![首页](http://sdj_work.gitee.io/note/img/pageHome.png)


完整效果请看：[http://sdjBlog.cn/](http://sdjBlog.cn/)

## 功能描述

### 已经实现功能

- [x] 登录
- [x] 注册
- [x] 文章列表
- [x] 标签分类
- [x] 点赞与评论
- [x] 文章详情展示（支持代码语法高亮和文章详情目录导航跟随滚动位置高亮）
- [x] 文章归档
- [x] 文章详情目录导航
- [x] 友情链接
- [x] 项目展示
- [x] 留言


## 前端技术

- vue
- vuex
- vue-route
- axios
- element-ui
- moment
- nprogress
- highlight.js
- scss

## 主要项目结构

```
- components
  - RaindropCanvas 留言下雨特效
  - BackTop 回到顶部
  - EmptyShow 数据为空提示
  - HeaderNav 头部导航
  - MyForm 表单封装
  - SideBar 侧边栏
  - TagBox 文章标签封装
- views
  - archive 文章归档
  - article 文章列表以及文章详情
  - home 首页（头部导航、侧边栏以及子路由加载）
  - project 项目
  - message 留言
  - redirect 路由重定向
- api axios封装以及api接口
- assets 图片和css资源
- router 路由
- store vuex 的状态管理
- utils 封装的常用的方法
- main.js 入口文件，实例化Vue、插件初始化
- app.vue 根组件，加载看板娘以及回到顶部
```

## Build Setup ( 建立安装 )

```
# install dependencies
npm install

# serve with hot reload at localhost: 8090
npm run dev

# build for production with minification
npm run build
```

**项目地址：**

> [前台展示: https://github.com/SuDaoJun/blog-page](https://github.com/SuDaoJun/blog-page)

> [管理后台：https://github.com/SuDaoJun/blog-admin](https://github.com/SuDaoJun/blog-admin)

> [后端：https://github.com/SuDaoJun/blog-node](https://github.com/SuDaoJun/blog-node)

> [博客地址：http://sdjBlog.cn/](http://sdjBlog.cn/)

**项目系列文章：**

> [Vue+Nuxt 博客展示](https://juejin.cn/post/6940629661147725861)

> [Vue+uniapp 博客展示](https://juejin.cn/post/6941182524303343624)

> [Vue+ElementUI 后台博客管理](https://juejin.cn/post/6935733545029599262)

> [node + koa + mongodb 博客接口开发](https://juejin.cn/post/6937589228423348238)

> [node + express + mongodb 博客接口开发](https://juejin.cn/post/6865113400251432967)
