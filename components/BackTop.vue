<template>
  <div class="back-top" @click="back" :style="{bottom}">

  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
      isBack: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let winH = document.documentElement.clientHeight || document.body.clientHeight
      if (scrollTop > winH / 2) {
          this.isBack = false
      }else{
          this.isBack = true
      }
    },
    back() {
      document.querySelector("#app").scrollIntoView({
        block: "start",
        behavior: "smooth"
      })
    }
  },
  computed: {
    maxBottom() {
      let winH = document.documentElement.clientHeight || document.body.clientHeight
      if (winH < 1150) {
        return 250;
      } else {
        let distance = winH - 1150;
        return 250 + distance;
      }
    },
    bottom() {
      if (this.isBack) {
        return "100%";
      } else {
        return `${this.maxBottom}px`;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.back-top {
  position: fixed;
  z-index: 27;
  width: 70px;
  height: 900px;
  right: 0;
  background-image: url("../assets/img/back-top.png");
  transition: bottom 1s;
  cursor: pointer;
}
</style>
