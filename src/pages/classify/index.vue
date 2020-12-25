<template>
  <view class="index-classify">
    <nav-header title='文章分类'></nav-header>
    <view class="classify-list">
      <view class="list-wrap" v-for='item in tagLsit' :key='item._id.id' @click='tagClick(item._id)'>
        <view class="wrap-box">
          <view class="box-title">
            <u-image  border-radius='10' error-icon='photo' height="200rpx" mode='scaleToFill' :src="bannerBg"></u-image>
            <u-badge :bgColor='item._id.bgColor' :overflow-count='999' :offset='[-12,-12]' :count="item.count"></u-badge>
          </view>
          <view class="box-name u-line-1">
            {{item._id.name}}
          </view>
          <view class="box-desc u-line-2">
            {{item._id.description}}
          </view>
        </view>
      </view>
    </view>
    <view class="classify-empty" v-if='tagLsit.length == 0'>
      <u-empty mode="list" text='文章分类数据为空' margin-top='100'></u-empty>
    </view>
    <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
  </view>
</template>

<script>
import { bannerBg } from '@/utils'
export default {
  components: {},
  data(){
    return {
      bannerBg:bannerBg,
      tagLsit: [],
      scrollTop: 0
    }
  },
  computed: {},
  methods: {
    async getTagList(){
      let result = await this.$u.api.article.articleTagList();
      this.tagLsit = result.data;
    },
    tagClick(item){
      this.$u.routePath.navigateTo('/pages/classify/articleTag', {
        id: item.id,
        name: item.name
      });
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getTagList();
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
  onPageScroll(event) {
    this.scrollTop = event.scrollTop;
  },
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.index-classify{
  padding: 40rpx 0;
  .classify-list{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .list-wrap{
      width: 50%;
      padding: 10px 30rpx;
      .wrap-box{
        .box-title{
          width: 100%;
          height: 200rpx;
          color: #fff;
          border-radius: 20rpx;
          font-size: 32rpx;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          /*  #ifdef  MP-WEIXIN  */
          /deep/ u-image{
            width: 100%;
          }
          /*  #endif  */
        }
        .box-name{
          margin: 10rpx 0 6rpx;
        }
        .box-desc{
          height: 80rpx;
          font-size: 24rpx;
          color: #808080;
        }
      }
    }
  }
}
</style>
