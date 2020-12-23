<template>
  <view class="index-search">
    <nav-header :isBack='true' :borderBottom='true' :title='tagTitle'></nav-header>
    <view class="search-banner">
      <u-image width="100%" height="360rpx" error-icon='photo' mode='scaleToFill' :src="bannerBg"></u-image>
    </view>
    <article-list :articleList='articleList' :status='pageObj.pageStatus' @loadmore='initListArticle'></article-list>
    <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
  </view>
</template>

<script>
import { baseURL, bannerBg } from '@/utils'
import ArticleList from '@/components/ArticleList'
export default {
  components: {
    ArticleList
  },
  data: () => ({
    bannerBg: bannerBg,
    tagTitle: '文章标签',
    tagId: '',
    articleList: [],
    pageObj: {
      pageSize: 1,
      pageStatus: 'loadmore'
    },
    scrollTop: 0
  }),
  computed: {},
  methods: {
    // 文章列表
    async initListArticle(){
      let pageObj = this.pageObj;
      pageObj.pageStatus = 'loading';
      let result = await this.$u.api.article.articleList({
        currentPage: pageObj.pageSize,
        pageSize: 10,
        tags: this.tagId
      })
      pageObj.pageSize = pageObj.pageSize + 1;
      let dataList = result.data.data;
      if(dataList.length > 0){
        dataList.forEach(item=>{
          item.image = `${baseURL}/blogAdmin/file/down?downId=${item.imgId}`;
          item.createTime = item.createTime.split(' ')[0];
        })
        this.articleList = this.articleList.concat(dataList);
        if(this.articleList.length == result.data.count){
          pageObj.pageStatus = 'nomore';
        }else{
          pageObj.pageStatus = 'loadmore';
        }
      }else{
        pageObj.pageStatus = 'nomore';
      }
    },
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(option) {
    this.tagTitle = option.name;
    this.tagId = option.id;
    this.initListArticle();
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
  onReachBottom() {
    if(this.pageObj.pageStatus == 'loadmore'){
      this.initListArticle();
    }
  },
  // 页面处理函数--监听页面滚动(not-nvue)
  onPageScroll(event) {
    this.scrollTop = event.scrollTop;
  },
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
.index-search{
  .search-banner{
    margin-bottom: 20rpx;
    position: relative;
  }
}
</style>
