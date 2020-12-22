<template>
  <view class="index-person">
    <nav-header title='个人中心'></nav-header>
    <view class="u-flex person-data" @click='infoData'>
      <view class="u-m-r-10">
        <u-avatar :src='baseURL+"/blogAdmin/file/down?downId="+vuex_userInfo.avatarId' size="140"></u-avatar>
      </view>
      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-10">{{vuex_userInfo.name}}</view>
        <view class="u-font-14 u-tips-color u-line-1">{{vuex_userInfo.info}}</view>
      </view>
      <view class="u-m-l-10 u-p-10">
        <u-icon name="arrow-right" color="#969799" size="28"></u-icon>
      </view>
    </view>
    <view class="person-article u-m-t-20">
      <u-cell-group>
        <u-cell-item icon="eye" title="最近浏览"></u-cell-item>
        <u-cell-item icon="photo" title="我的点赞"></u-cell-item>
        <u-cell-item icon="heart" title="我的评论"></u-cell-item>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
import { baseURL } from '@/utils'
export default {
  components: {},
  data: () => ({
    baseURL,
  }),
  computed: {},
  methods: {
    infoData(){
      this.$u.routePath.navigateTo('/pages/person/infoData');
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

<style lang="scss" scoped>
.person-data{
  background-color: #fff;
  padding: 20rpx 30rpx;
}
</style>
