## 前言

此 uniapp-blog 项目是基于 uni-app + uview-ui 开发

## 效果图

![首页](https://s3.ax1x.com/2021/03/18/6gU0fJ.png)  

![留言](https://s3.ax1x.com/2021/03/18/6gUDp9.png)

完整效果请看：[http://sdjBlog.cn](http://sdjBlog.cn)

## 功能描述

### 已经实现功能

- [x] 注册登录
- [x] 文章列表
- [x] 文章点赞评论
- [x] 文章分类
- [x] 留言列表
- [x] 个人中心

## 项目结构

```
- public index.html首页
- src
  - components
    - ArticleList   文章列表
    - LoginModal  注册登录弹框
    - MessageBarrage  留言弹幕
    - NavHeader   头部导航
  - pages
    - classify   
      - articleTag  分类标签列表
      - index  文章分类列表
    - home
      - answer 你的答案
      - articleDetail 文章详情
      - index 博客首页
      - search 文章搜索页
      - view 文章每日一看
    - message 留言列表
    - person
      - index 个人中心
      - infoArticle 历史足迹
      - infoData 个人信息
  - static 字体图标和图片
  - store Vuex状态管理
  - utils API请求和路由跳转封装
  - App.vue 配置App全局样式以及监听应用生命周期
  - main.js Vue初始化入口文件
  - manifest.json 配置应用名称、appid, logo, 版本等打包信息
  - pages.json 页面路由、选项卡等页面信息
  - uni.scss scss全局样式
- unpackage app打包图片

```

## 说明

- 项目通过 `vue-cli` 命令行方式创建

- 安卓APP通过 `HBuilderX` 工具打包

## 建立安装

```bash
# 安装依赖
$ npm install

# web端开发环境
$ npm run dev

# web端打包生产环境
$ npm run build

# 微信小程序端打包生产环境
$ npm run build:mp-weixin
```

## 微信小程序

![小程序](https://s3.ax1x.com/2021/03/11/6thivV.jpg)

**项目地址：**

> [前台展示：https://gitee.com/sdj_work/blog-page（Vue/Nuxt/uni-app）](https://gitee.com/sdj_work/blog-page)

> [管理后台：https://gitee.com/sdj_work/blog-admin（Vue/React）](https://gitee.com/sdj_work/blog-admin)

> [后端Node：https://gitee.com/sdj_work/blog-node（Express/Koa）](https://gitee.com/sdj_work/blog-node)

> [博客地址：https://sdjBlog.cn/](https://sdjBlog.cn/)
