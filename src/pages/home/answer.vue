<template>
  <view class="index-answer">
    <nav-header :isBack='true' title='答案之书'></nav-header>
    <view class="answer-banner">
      <u-image width="100%" height="360rpx" mode='scaleToFill' :src="bannerBg"></u-image>
    </view>
    <view class="answer-title">你的答案</view>
    <view class="answer-btn">
      <u-button type='warning' :disabled='btnDisabled' @click='answerResult'>获取答案</u-button>
    </view>
    <view class="answer-txt">{{answerTxt}}</view>
  </view>
</template>

<script>
import { answerArr, bannerBg} from '@/utils'
export default {
  components: {},
  data: () => ({
    bannerBg: bannerBg,
    answerTxt: '',
    btnDisabled: true
  }),
  computed: {},
  methods: {
    answerResult(){
      let number = Math.floor(Math.random()*225);
      let str = answerArr[number];
      let index = 0;
      let timer = setInterval(() => {
        this.btnDisabled = true;
        if (index >= str.length) {
          this.btnDisabled = false;
          clearInterval(timer);
        }
        index++
        this.answerTxt = str.substring(0, index)
      }, 300)
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.answerResult();
  },
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
  .answer-title{
    margin-top: 30rpx;
    text-align: center;
    font-size: 36rpx;
    font-weight: 600;
    letter-spacing: 4rpx;
  }
  .answer-btn{
    padding: 0 40rpx;
    margin: 40rpx 0;
  }
  .answer-txt{
    text-align: center;
    padding: 0 40rpx;
    font-size: 32rpx;
    letter-spacing: 2rpx;
  }
</style>
