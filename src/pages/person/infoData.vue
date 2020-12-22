<template>
  <view class="info-data">
    <nav-header :isBack='true' :borderBottom='true' title='个人信息'></nav-header>
    <view class="show-data">
      <u-cell-group>
        <u-cell-item title="头像" @click='avatarChange'>
          <u-image error-icon='account'  slot="right-icon" width="85rpx" height="85rpx" :border-radius='8' :src='baseURL+"/blogAdmin/file/down?downId="+infoData.avatarId'></u-image>
        </u-cell-item>
        <u-cell-item title="用户名" :value='infoData.name'></u-cell-item>
        <u-cell-item title="邮箱" :value='infoData.email'></u-cell-item>
        <u-cell-item title="个性签名" :value='infoData.info || "--"'>
        </u-cell-item>
        <u-cell-item title="修改密码"></u-cell-item>
      </u-cell-group>
    </view>
    
    <view class="show-btn u-p-l-40 u-p-r-40 u-m-t-60">
      <u-button type="primary" shape='circle'>保存信息</u-button>
    </view>
    <login-modal :modelShow='modelShow' @closeModal='modelShow = false'></login-modal>
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
    infoData: {}
  }),
  computed: {},
  methods: {
    avatarChange(){
      uni.chooseImage({
          success: (chooseImageRes) => {
              const tempFilePaths = chooseImageRes.tempFilePaths;
              const uploadTask = uni.uploadFile({
                  url: `${baseURL}/blogAdmin/file/upload`,
                  filePath: tempFilePaths[0],
                  name: 'file',
                  header: {
                    Authorization: "Bearer "+this.vuex_token
                  },
                  formData: {},
                  success: (uploadFileRes) => {
                    let data = JSON.parse(uploadFileRes.data);
                    this.infoData.avatarId = data.data.sourceId;
                  }
              });
          }
      });
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.infoData = this.$u.deepClone(this.vuex_userInfo);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
  },
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
</style>
