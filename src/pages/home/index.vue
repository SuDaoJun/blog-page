<template>
  <view class="index-home">
    <nav-header title='路遥博客' :borderBottom='false'></nav-header>
    <view class="home-swiper">
      <u-swiper :list="swiperList" :title='true' :title-style='titleStyle' mode='dot' :height='360' :border-radius='0' img-mode='aspectFill'></u-swiper>
    </view>
    <view class='home-type'>
      <view class="box-item" v-for='item in typeList' :key='item.title' @click="routePath(item.path)">
        <view class="item-icon">
          <u-icon :name="item.iconObj.name" custom-prefix="custom-icon" :size="item.iconObj.size" :color="item.iconObj.color"></u-icon>
        </view>
        <text>{{item.title}}</text>
      </view>
    </view>
    <view class='home-search'>
      <u-search shape="round" :clearabled="true" maxlength='20' placeholder="文章搜索..." v-model="keywordSearch" @custom='articleSearch' @search='articleSearch'></u-search>
    </view>
    <article-list :articleList='articleList' :status='pageObj.pageStatus' @loadmore='initListArticle'></article-list>
    <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
  </view>
</template>

<script>
import { baseURL } from '@/utils'
import ArticleList from '@/components/ArticleList'
export default {
  components: {
    ArticleList
  },
  data: () => ({
    swiperList: [],
    titleStyle: {
      textAlign: 'center'
    },
    typeList: [
      {
        title: '排行',
        path: '/pages/home/articlePeace',
        iconObj: {
          name: 'icon--scrm-53',
          size: '80',
          color: '#3B8EE8'
        }
      },
      {
        title: '答案',
        path: '/pages/home/answer',
        iconObj: {
          name: 'icon--scrm-49',
          size: '80',
          color: '#5078AA'
        }
      },
      {
        title: '看看',
        path: '/pages/home/view',
        iconObj: {
          name: 'icon--scrm-50',
          size: '80',
          color: '#EE8848'
        }
      }
    ],
    keywordSearch: '',
    articleList: [],
    pageObj: {
      pageSize: 1,
      pageStatus: 'loadmore'
    },
    scrollTop: 0
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
    },
    // 文章列表
    async initListArticle(){
      let pageObj = this.pageObj;
      pageObj.pageStatus = 'loading';
      let result = await this.$u.api.article.articleList({
        currentPage: pageObj.pageSize,
        pageSize: 10
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
    // 路由列表跳转
    routePath(path){
      this.$u.routePath.navigateTo(path);
    },
    // 文章搜索
    articleSearch(){
      let keywordSearch = this.keywordSearch;
      if(keywordSearch){
        this.$u.routePath.navigateTo('/pages/home/search', {
          keyword: this.keywordSearch
        });
      }else{
        this.$u.toast('请输入内容');
      }
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.initSwiperArticle();
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
.home-type{
  margin-top: 20rpx;
  padding: 20rpx 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .box-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    .item-icon{
      width: 80rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    text{
      letter-spacing: 2rpx;
      color: #999;
    }
  }
}
.home-search{
  background-color: #fff;
  margin: 20rpx 0;
  padding: 20rpx 20rpx;
}
</style>
