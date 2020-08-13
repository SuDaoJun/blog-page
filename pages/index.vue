<template>
  <div class="wrapper">
    <header-nav></header-nav>
    <div class="wrapper-index">
      <div class="index-router">
        <nuxt-child />
      </div>
      <side-bar></side-bar>
    </div>
    <div class="wrapper-footer">
      <a href="http://www.beian.miit.gov.cn/">æ¹˜ICPå¤‡20010588å�·</a>
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import SideBar from '@/components/SideBar'
export default {
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

  },
  watch: {

  },
  components: {
    HeaderNav,
    SideBar
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .wrapper-index{
    width: 1200px;
    margin: 0 auto;
    padding-top: 100px;
    position: relative;
    display: flex;
    .index-router{
      flex: 1;
    }
  }
  .wrapper-footer{
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
    display: none;
  }
</style>