## 前言

此 nuxt-blog 项目是基于 nuxt 服务器渲染(SSR)构建

## 效果图

![首页](https://s3.ax1x.com/2021/03/17/6cXhRS.png)
![留言](https://s3.ax1x.com/2021/03/17/6cvju4.png)

完整效果请看：[http://sdjBlog.cn/](http://sdjBlog.cn/)

## 功能描述

### 已经实现功能

- [x] 注册登录
- [x] 文章列表
- [x] 友情链接
- [x] 文章点赞评论
- [x] 文章归档
- [x] 项目列表
- [x] 留言列表
- [x] 看板娘背景

## 技术库依赖

- @nuxtjs/axios （API请求）
- @nuxtjs/style-resources  （scss公共文件引入）
- element-ui  （组件库）
- highlight.js （代码高亮）
- moment  （时间格式处理）
- nprogress    （进度条）
- nuxt  （Vue框架）

## 项目结构

```

- assets 资源文件（图片、css和字体图标）
- components
  - RaindropCanvas   下雨特效
  - BackTop  返回顶部
  - EmptyShow  空状态
  - HeaderNav   头部导航
  - MyForm   表单封装
  - SideBar   侧边栏
  - TagBox   标签展示
- layouts 布局入口页面
- pages
  - article   嵌套路由
    - page
      - _num  文章列表
    - archive 文章归档
    - project 项目列表
  - articleDetail
    - _id 文章详情
  - article 文章列表头部及侧边栏
  - index 默认首页路由
  - message 留言列表
- plugins 插件封装
- static 看板娘、背景资源等
- store Vuex状态管理
- utils 表单校验、标题目录导航和时间格式化等一些常用方法封装
- nuxt.config 个性化配置

```

## 说明

- 线上使用pm2部署，把.nuxt、static、nuxt.config.js和package.json文件放到服务器上，执行npm install安装依赖，pm2 start npm --name "nuxtBlog" -- run start来启动服务，package.json中config配置端口

## 建立安装

```bash
# 安装依赖
$ npm install

# 开发环境
$ npm run dev

# 打包生产环境
$ npm run build
$ npm run start

# 静态打包
$ npm run generate
```

**项目地址：**

> [前台展示：https://gitee.com/sdj_work/blog-page（Vue/Nuxt/uni-app）](https://gitee.com/sdj_work/blog-page)

> [管理后台：https://gitee.com/sdj_work/blog-admin（Vue/React）](https://gitee.com/sdj_work/blog-admin)

> [后端Node：https://gitee.com/sdj_work/blog-node（Express/Koa）](https://gitee.com/sdj_work/blog-node)

> [博客地址：https://sdjBlog.cn/](https://sdjBlog.cn/)
