<template>
  <view class="article-peace">
    <nav-header :isBack='true' title='文章排行'></nav-header>
    <u-tabs class='u-border-bottom' :list="list" :is-scroll="false" :bold='false' :current="current" @change="change"></u-tabs>
    <view class="peace-list">
      <article-list :articleList='articleList' :status='pageObj.pageStatus' @loadmore='initListArticle'></article-list>
      <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
    </view>
  </view>
</template>

<script>
import { baseURL } from '@/utils'
import ArticleList from '@/components/ArticleList'
export default {
  components: {
    ArticleList
  },
  data(){
    return {
      current: 0,
      list: [
        {
          name: '浏览数'
        },
        {
          name: '点赞数'
        },
        {
          name: '评论数'
        }
      ],
      articleList: [],
      pageObj: {
        pageSize: 1,
        pageStatus: 'loadmore'
      },
      scrollTop: 0,
      sortBy: 'meta.viewTotal'
    }
  },
  computed: {},
  methods: {
    // 文章列表
    async initListArticle(){
      let pageObj = this.pageObj;
      pageObj.pageStatus = 'loading';
      let result = await this.$u.api.article.articleList({
        currentPage: pageObj.pageSize,
        pageSize: 10,
        sortBy: this.sortBy,
        sortOrders: '-1'
      })
      pageObj.pageSize = pageObj.pageSize + 1;
      let dataList = result.data.data;
      if(dataList.length > 0){
        dataList.forEach(item=>{
          item.image = `${baseURL}/blogAdmin/file/down?downId=${item.imgId}`
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
    change(index) {
      this.current = index;
      let obj = {
        0: 'meta.viewTotal',
        1: 'meta.likeTotal',
        2: 'meta.commentTotal'
      }
      this.sortBy = obj[index];
      this.pageObj.pageSize = 1;
      this.pageObj.pageStatus = 'loading';
      this.articleList = [];
      this.initListArticle();
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
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
.peace-list{
  padding-top: 6rpx;
}
</style>
