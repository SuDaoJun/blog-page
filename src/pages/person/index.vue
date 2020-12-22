<template>
  <view class="index-person">
    <nav-header title='个人中心'></nav-header>
    <view class="u-flex person-data" @click='infoData'>
      <view class="u-m-r-20">
        <u-avatar :src='baseURL+"/blogAdmin/file/down?downId="+vuex_userInfo.avatarId' size="120"></u-avatar>
      </view>
      <view class="u-flex-1">
        <view class="u-font-18 u-p-b-10">{{vuex_userInfo.name || '登录'}}</view>
        <view class="u-font-14 u-tips-color u-line-1">{{vuex_userInfo.info}}</view>
      </view>
      <view class="u-m-l-10 u-p-10 u-flex">
        <view class='u-m-r-20' v-show='vuex_userInfo.id' @click.stop='logout'>
          <u-tag text="退出登录" type='warning' shape="circle" />
        </view>
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
    <login-modal :modelShow='modelShow' @closeModal='modelShow = false'></login-modal>
    <u-modal v-model="confirShow" :show-cancel-button='true' :show-title='false' content="立即登录，体验更多功能" @confirm='modelShow = true'></u-modal>
  </view>
</template>

<script>
import { baseURL } from '@/utils'
import LoginModal from '@/components/LoginModal'
export default {
  components: {
    LoginModal
  },
  data: () => ({
    baseURL,
    modelShow: false,
    confirShow: false,
  }),
  computed: {},
  methods: {
    // 查看用户信息
    infoData(){
      if(!this.vuex_userInfo.id){
        this.modelShow = true;
        return
      }
      this.$u.routePath.navigateTo('/pages/person/infoData');
    },
    // 退出登录
    logout(){
      // this.$u.vuex('vuex_token', '');
      // this.$u.vuex('vuex_userInfo', {});
      uni.setStorageSync("loginStatus", '0');
      this.$store.commit('$storeLife', {
        name: 'vuex_token',
        value: ''
      })
      this.$store.commit('$storeLife', {
        name: 'vuex_userInfo',
        value: {}
      })
    }
  },
  watch: {},
  // 页面周期函数--监听页面加载
  onLoad() {
    if(!this.vuex_userInfo.id){
      this.confirShow= true;
    }
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
.person-data{
  background-color: #fff;
  padding: 20rpx 30rpx;
}
</style>
