<template>
  <view class="index-home">
    <nav-header title='路遥博客'></nav-header>
    <view class="home-swiper">
      <u-swiper :list="swiperList" :title='true' mode='dot' height='360' :border-radius='0' img-mode='scaleToFill'></u-swiper>
    </view>
  </view>
</template>

<script>
import { baseURL} from '@/utils'
export default {
  components: {},
  data: () => ({
    swiperList: []
  }),
  computed: {},
  methods: {
    // 文章按点赞排序轮播图
    async initSwiperArticle(){
      let result = await this.$u.api.article.articleList({
        currentPage: 1,
        pageSize: 3,
        sortBy: 'meta.likeTotal',
        sortOrders: '-1'
      })
      let dataList = result.data.data;
      if(dataList.length > 0){
        dataList.forEach(item=>{
          item.image = `${baseURL}/blogAdmin/file/down?downId=${item.imgId}`
        })
        this.swiperList = dataList;
      }
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.initSwiperArticle();
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
.home-swiper{
  margin-top: 10rpx;
}
</style>
