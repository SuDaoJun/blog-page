<template>
  <div class="wrapper">
    <header-nav></header-nav>
    <div class="wrapper-index">
      <div class="index-router">
        <router-view></router-view>
      </div>
      <side-bar></side-bar>
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
</style>