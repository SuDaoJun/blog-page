<template>
  <div id="app" class='body-index'>
    <router-view />
    <back-top></back-top>
  </div>
</template>

<script>
import "@/assets/css/common.scss";
import BackTop from '@/components/BackTop'
export default {
  name: "App",
  data() {
    return {
      
    }
  },
  created() {
    let str = "shizuku";
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: "static/live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: `live2d-widget-model-shizuku/assets/`,
        tagMode: false,
        debug: false,
        model: {
          jsonPath: `/static/live2dw/live2d-widget-model-shizuku/assets/shizuku.model.json`
        },
        display: {
          position: "right",
          width: 220,
          height: 400,
          hOffset: 30,
          vOffset: -45
        },
        react: { opacity: 0.7 },
        mobile: { show: true },
        log: false
      });
    }, 400);
  },
  mounted() {
    let userInfo = sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):null
    this.$store.dispatch('operateUserInfo', userInfo)
  },
  methods: {
    
  },
  components: {
    BackTop
  }
}
</script>

<style lang="scss">
body {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background-color: #F4F5F5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
