<template>
  <view class="index-view">
    <nav-header :isBack='true' title='每日一看'></nav-header>
    <view class="view-banner">
      <u-image width="100%" height="360rpx" mode='scaleToFill' :src="bannerBg"></u-image>
    </view>
    <view class="view-txt">{{articleObj.title}}</view>
    <view class="view-btn">
      <u-button type='warning' :loading='loading' @click='articleResult'>每日一看</u-button>
    </view>
  </view>
</template>

<script>
import { bannerBg} from '@/utils'
export default {
  components: {},
  data: () => ({
    bannerBg: bannerBg,
    loading: false,
    articleObj: {}
  }),
  computed: {},
  methods: {
    articleResult(){

    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {},
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss">
.view-txt{
  text-align: center;
  padding: 0 40rpx;
  font-size: 32rpx;
  letter-spacing: 2rpx;
  margin: 40rpx 0;
  color: #007aff;
}
.view-btn{
  padding: 0 40rpx;
}
</style>
