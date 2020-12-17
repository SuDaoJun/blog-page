<template>
  <view class="login-modal">
    <u-modal v-model="value" :show-title='false' :show-confirm-button='false'>
      <view class="slot-content">
        
      </view>
    </u-modal>
  </view>
</template>

<script>

export default {
  props: {},
  data: () => ({
    value: false,
    title: '账号登录',
    bottomObj: {
      login: '登录',
      register: '注册'
    }
  }),
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

<style lang="scss" scoped></style>
