<template>
  <canvas id="raindrop-canvas" class='rain-canvas' @click="close"></canvas>
</template>
<script>
import rainCanvas from "./main.js";
export default {
  data() {
    return {

    }
  },
  mounted() {
    rainCanvas(document.querySelector("#raindrop-canvas"))
  },
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="scss" scoped>
.rain-canvas {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999;
  opacity: 0.7;
}
</style>