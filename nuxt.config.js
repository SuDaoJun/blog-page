
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: '个人博客',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'keywords', name: 'keywords', content: '前端，博客，vue，node'},
      { hid: 'description', name: 'description', content: '个人技术知识博客，vue，node' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script:[
      {
        src:'/live2dw/lib/L2Dwidget.min.js'
      },
      {
        src:'/navigator.js'
      }
    ]
  },
  loading: false,
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/icons/iconfont.css',
    '@/assets/css/reset.css',
    '@/assets/css/common.scss'
  ],
  styleResources: {
    scss: '@/assets/css/base.scss'
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {src:'@/plugins/element-ui', ssr:true },
    {src:'@/plugins/nprogress', ssr:false },
    {src:'@/plugins/axios', ssr:true },
    {src:'@/plugins/commom', ssr:false },
  ],
  axios: {
    //开发模式下开启debug
    debug: process.env.NODE_ENV == "production" ? false : true,
    withCredentials: false,
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" }
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios'
  ],
  vender:[
    'element-ui', 'axios'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^element-ui/]
  }
}
