<template>
  <view class="article-peace">
    <nav-header :isBack='true' title='历史足迹'></nav-header>
    <u-tabs class='u-border-bottom' :list="list" :is-scroll="false" :bold='false' :current="current" @change="change"></u-tabs>
    <view class="peace-list">
      <article-list :articleList='articleList' :status='pageObj.pageStatus' @loadmore='initListArticle'></article-list>
      <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
    </view>
    <login-modal :modelShow='modelShow' @closeModal='closeModal'></login-modal>
  </view>
</template>

<script>
import { baseURL } from '@/utils'
import ArticleList from '@/components/ArticleList'
import LoginModal from '@/components/LoginModal'
export default {
  components: {
    ArticleList,
    LoginModal
  },
  data(){
    return {
      modelShow: false,
      current: 0,
      viewType: '1',
      list: [
        {
          name: '最近浏览'
        },
        {
          name: '我的点赞'
        },
        {
          name: '我的评论'
        }
      ],
      articleList: [],
      pageObj: {
        pageSize: 1,
        pageStatus: 'loadmore'
      },
      scrollTop: 0,
    }
  },
  computed: {},
  methods: {
    // 文章列表
    async initListArticle(){
      let {pageObj, viewType, vuex_userInfo} = this;
      if(vuex_userInfo.id){
        pageObj.pageStatus = 'loading';
        let result = await this.$u.api.article.getUserHistory({
          currentPage: pageObj.pageSize,
          pageSize: 10,
          type: viewType
        })
        pageObj.pageSize = pageObj.pageSize + 1;
        let dataList = result.data.data;
        dataList = dataList.filter(item => {
          return item.article && item.article.length > 0;
        });
        if(dataList.length > 0){
          dataList.forEach((item,index,arr)=>{
            arr[index] = item.article[0];
            arr[index].image = `${baseURL}/blogAdmin/file/down?downId=${arr[index].imgId}`
            arr[index].createTime = arr[index].createTime.split(' ')[0];
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
      }else{
        this.$u.toast('查看信息前，请先登录');
        this.modelShow = true;
      }
    },
    // 登录弹框关闭
    closeModal(){
      this.modelShow = false;
      if(this.vuex_userInfo.id){
        this.pageObj.pageSize = 1;
        this.pageObj.pageStatus = 'loading';
        this.articleList = [];
        this.initListArticle();
      }
    },
    // tab切换
    change(index) {
      this.current = index;
      let obj = {
        0: '1',
        1: '2',
        2: '3'
      }
      this.viewType = obj[index];
      this.pageObj.pageSize = 1;
      this.pageObj.pageStatus = 'loading';
      this.articleList = [];
      this.initListArticle();
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(option) {
    this.viewType = option.type;
    this.current = Number(option.type) - 1;
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