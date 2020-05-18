<template>
  <div class="tag-list">
    <div class="list-box" v-for='item in tagList' :key='item._id'>
      <div :class="articleFilter.tags == item._id && showBorder?'box-tag box-active':'box-tag'" :style="{backgroundColor: item.bgColor}" @click='tagClick(item._id)'>
        <i :style="{borderRightColor: item.bgColor}"></i>
        {{item.name}}{{item.count?'('+item.count+')':''}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showBorder: {
      type: Boolean,
      default: false
    },
    tagList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      idActive: ''
    }
  },
  mounted() {},
  methods: {
    tagClick(id){
      this.$emit('tagClick', id)
    }
  },
  watch: {},
  components: {},
  computed: {
    articleFilter(){
      return this.$store.getters.getFilterObj
    }
  }
};
</script>

<style lang="scss" scoped>
.tag-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .list-box {
    cursor: pointer;
    margin: 5px 10px;
    .box-tag{
      color: #fff;
      height: 22px;
      line-height: 22px;
      padding: 0 5px 0px 10px;
      position: relative;
      border-radius: 0 5px 5px 0;
      margin: 5px 12px;
      i {
        position: absolute;
        right: 100%;
        font-size: 0;
        line-height: 0;
        border: 11px solid transparent;
      }
      &:after {
        content: "";
        width: 5px;
        height: 5px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 9px;
        left: 1px;
      }
    }
    .box-active{
      &:after {
        display: none;
      }
    }
  }
}
</style>