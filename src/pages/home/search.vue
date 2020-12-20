<template>
  <view class="index-search">
    <nav-header :isBack='true' :borderBottom='false' :useSlot='true' :keyword='keyword' @handleSearch='handleSearch'></nav-header>
    <view class="search-banner">
      <u-image width="100%" height="360rpx" mode='scaleToFill' :src="bannerBg"></u-image>
      <view class="banner-txt">
        搜索关键字：{{keyword || '无'}}
      </view>
    </view>
    <view class="search-history" v-show='historyList.length > 0'>
      <view class="history-title">
        <text>历史搜索</text>
        <u-icon name="close" color='#c8c9cc' size='36' @click='clearHistory'></u-icon>
      </view>
      <view class="history-list">
        <view class="list-item" v-for='item in historyList'>
          <u-tag  :key='item' :text="item" @click='itemClick(item)' type="info" shape='circle' />
        </view>
        
      </view>
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
    keyword: '',
    articleList: [],
    historyList: [],
    pageObj: {
      pageSize: 1,
      pageStatus: 'loadmore'
    },
    scrollTop: 0
  }),
  computed: {},
  methods: {
    handleSearch(val){
      this.keyword = val;
      this.pageObj.pageSize = 1;
      this.pageObj.pageStatus = 'loading';
      this.articleList = [];
      this.initListArticle();
    },
    clearHistory(){
      uni.removeStorageSync('historyList');
      this.historyList = [];
    },
    itemClick(keyword){
      this.keyword = keyword;
      this.pageObj.pageSize = 1;
      this.pageObj.pageStatus = 'loading';
      this.articleList = [];
      this.initListArticle('1');
    },
    // 文章列表
    async initListArticle(selectBool = '0'){
      let keyword = this.keyword;
      this.historyList = uni.getStorageSync("historyList") || [];
      // 存储历史搜索
      if(keyword && selectBool == '0'){
        if(uni.getStorageSync("historyList")){
          let historyList = uni.getStorageSync("historyList");
          historyList.unshift(keyword);
          historyList = [...new Set(historyList)];
          console.info(historyList)
          if(historyList.length > 8){
            historyList = historyList.slice(0,8);
          }
          console.info(historyList)
          this.historyList = historyList;
          uni.setStorageSync("historyList", historyList)
        }else{
          let historyList = [keyword];
          this.historyList = historyList;
          uni.setStorageSync("historyList", historyList);
        }
      }
      
      let pageObj = this.pageObj;
      pageObj.pageStatus = 'loading';
      let result = await this.$u.api.article.articleList({
        currentPage: pageObj.pageSize,
        pageSize: 10,
        title: keyword
      })
      pageObj.pageSize = pageObj.pageSize + 1;
      let dataList = result.data.data;
      if(dataList.length > 0){
        let replaceReg = new RegExp(keyword, 'g');
        dataList.forEach(item=>{
          item.image = `${baseURL}/blogAdmin/file/down?downId=${item.imgId}`;
          item.createTime = item.createTime.split(' ')[0];
          item.title = item.title.replace(replaceReg, `<span>${keyword}</span>`)
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
    this.keyword = option.keyword
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
    .banner-txt{
      color: #fff;
      font-weight: 600;
      font-size: 36rpx;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .search-history{
    margin-bottom: 20rpx;
    padding: 0 40rpx;
    .history-title{
      margin-bottom: 30rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text{
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
      }
    }
    .history-list{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .list-item{
        margin: 0 40rpx 30rpx 0;
      }
    }
  }
}
</style>
