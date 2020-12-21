<template>
  <view class="index-message">
    <nav-header title='留言'></nav-header>
    <view class="message-banner">
      <u-image width="100%" height="400rpx" mode='scaleToFill' :src="messageBg"></u-image>
      <message-barrage ref='messageBarrage' @end="dataEnd"></message-barrage>
    </view>
  </view>
</template>

<script>
import { baseURL, messageBg } from '@/utils'
import MessageBarrage from '@/components/MessageBarrage'
export default {
  components: {
    MessageBarrage
  },
  data: () => ({
    messageBg,
    messageList: [],
    randomMessageList: []
  }),
  computed: {},
  methods: {
    // 获取留言列表
    getMessageList(){

    },
    // 获取随机留言
    getRandomMessageList(){
      this.$u.api.message.messageRandom({
        num: 99
      }).then(res=>{
        this.randomMessageList = res.data;
        this.$refs.messageBarrage.start(this.randomMessageList);
      })
    },
    dataEnd(){
      this.getRandomMessageList();
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getMessageList();
    this.getRandomMessageList();
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

<style lang="scss" scoped>
.message-banner{
  margin-bottom: 20rpx;
  position: relative;
}
</style>
