<template>
  <view class="article-detail">
    <nav-header :isBack='true' title='文章详情'></nav-header>
    <view class="detail-content">
      <view class="content-title">{{articleData.title}}</view>
      <view class="content-author">
        <u-avatar :src='articleData.avatarImg'></u-avatar>
        <view class="author-info">
          <text class='info-name'>{{articleData.createUser?articleData.createUser.name:'--'}}</text>
          <view class="info-extra">
            <view class="extra-item">
              <u-icon name="clock"></u-icon>
              <text class='item-num'>{{articleData.createTime}}</text>
            </view>
            <view class="extra-item">
              <u-icon name="edit-pen"></u-icon>
              <text class='item-num'>{{articleData.meta.txtTotal}}</text>
            </view>
            <view class="extra-item">
              <u-icon name="eye"></u-icon>
              <text class='item-num'>{{articleData.meta.viewTotal}}</text>
            </view>
            <view class="extra-item">
              <u-icon name="chat"></u-icon>
              <text class='item-num'>{{articleData.meta.commentTotal}}</text>
            </view>
            <view class="extra-item">
              <u-icon name="heart"></u-icon>
              <text class='item-num'>{{articleData.meta.likeTotal}}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="content-txt">
        <u-parse :html="articleData.content" :lazy-load="true" :show-with-animation="true"></u-parse>
      </view>
    </view>
    <view class="detail-bottom">
      <u-icon name="home" size='48' @click='backHome'></u-icon>
      <view class="bottom-comment">
        <u-search shape="round" :clearabled="true" maxlength='200' placeholder="评论..." v-model="commentValue" @custom='commentSubmit' @search='commentSubmit'></u-search>
      </view>
      <u-icon :color='likeObj.color' :name="likeObj.name" size='48'></u-icon>
    </view>
    <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
    <login-modal></login-modal>
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
    scrollTop: 0,
    articleId: '',
    articleData: {
      meta: {}
    },
    commentValue: '',
    likeObj: {
      name: 'heart',
      color: '#808080'
    }
  }),
  computed: {},
  methods: {
    // 数据初始化
    async initData(){
      let result = await this.getArticleDetail();
      console.info(result)
      let data = result.data;
      data.createTime = data.createTime.split(' ')[0];
      data.avatarImg = data.createUser?`${baseURL}/blogAdmin/file/down?downId=${data.createUser.avatarId}`:'';
      this.articleData = data;
    },
    // 获取文章详情
    async getArticleDetail(){
      let result = await this.$u.api.article.articleDetail({
        id: this.articleId
      })
      return result;
    },
    // 评论提交
    commentSubmit(){
      if(!this.commentValue){
        return this.$u.toast('请输入评论内容');
      }
    },
    // 返回首页
    backHome(){
      this.$u.routePath.switchTab('/pages/home/index');
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad(option) {
    this.articleId = option.articleId;
    this.initData();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {
    
  },
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
.article-detail{
  min-height: 100vh;
  padding-bottom: 100rpx;
  background-color: #F7F7F7;
  .detail-content{
    padding: 20rpx 40rpx;
    .content-title{
      color: #000;
      font-size: 36rpx;
      text-align: center;
    }
    .content-author{
      margin: 40rpx 0 50rpx;
      display: flex;
      align-items: center;
      .author-info{
        margin-left: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .info-extra{
          font-size: 24rpx;
          margin-top: 12rpx;
          display: flex;
          align-items: center;
          .extra-item{
            &:last-child{
              margin-right: 0;
            }
            color: #808080;
            margin-right: 30rpx;
            .item-num{
              margin-left: 6rpx;
            }
          }
        }
      }
    }
  }
  .detail-bottom{
    width: 100vw;
    height: 100rpx;
    padding: 0 40rpx;
    color: #808080;
    background-color: #fff;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    .bottom-comment{
      flex: 1;
      padding: 0 40rpx;
    }
  }
}
/deep/ .content-txt{
  h1,h2,h3,h4,h5,h6{
    font-size: 40rpx;
    padding-bottom: 12px;
    margin-top: 40rpx;
    font-weight: 600;
    margin-bottom: 20rpx;
    line-height: 1.5;
    border-bottom: 1rpx solid #ececec;
    color: #000;
  }
  p, div{
    font-size: 28rpx;
    margin-top: 20rpx;
    font-weight: 400;
    margin-bottom: 20rpx;
    color: #333;
  }
  pre{
    color: #333;
    background: rgba(0,0,0,.1);
    position: relative;
    overflow: auto;
    line-height: 1.75;
    padding: 20rpx 10rpx 20rpx 30rpx;
    font-size: 24rpx;
  }
  img{
    margin-bottom: 20rpx;
  }
  table{
    font-size: 24rpx;
    display: block;
    width: 100%;
    overflow: auto;
    margin-top: 0;
    margin-bottom: 20rpx;
    border-spacing: 0;
    border-collapse: collapse;
    thead{
      background: #f6f6f6;
      color: #333;
      text-align: left;
      th{
        font-weight: 600;
        padding: 12rpx 24rpx;
        border: 1rpx solid #dfe2e5;
      }
    }
    tr{
      background-color: #fff;
    }
    td{
      padding: 12rpx 24rpx;
      border: 1rpx solid #dfe2e5;
    }
  }
}
</style>
