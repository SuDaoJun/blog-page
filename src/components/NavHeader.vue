<template>
  <view class="nav-header">
    <u-navbar :back-text='backText' :is-back="isBack" :title="title" :background="background" :title-color='titleColor' :back-icon-color='backIconColor' :back-text-style='backTextColor'>
      <view class="slot-right" slot='right' v-if='rightSlot'>
        
      </view>
    </u-navbar>
  </view>
</template>

<script>

export default {
  props: {
    backText: {
      type: String,
      default: '返回'
    },
    title: {
      type: String,
      default: ''
    },
    titleColor: {
      type: String,
      default: '#fff'
    },
    backIconColor: {
      type: String,
      default: '#fff'
    },
    backIconColor: {
      type: String,
      default: '#fff'
    },
    isBack: {
      type: Boolean,
      default: false
    },
    rightSlot: {
      type: Boolean,
      default: false
    },
    backTextColor: {
      type: Object,
      default: ()=>{
        return {
          color: '#ffffff'
        }
      }
    },
    background: {
      type: Object,
      default: ()=>{
        return {
          backgroundImage: 'linear-gradient(270deg, #1BA2E8, #36EAE8)'
        }
      }
    }
  },
  data: () => ({}),
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
  .slot-right{
    padding-right: 24rpx;
    color: #fff;
  }
</style>
