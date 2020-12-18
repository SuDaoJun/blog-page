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
      <view class="content-comment">
        <view class="comment" v-for="(res, index) in commentList" :key="res._id">
          <view class="left"><image :src="res.avatarImg" mode="aspectFill"></image></view>
          <view class="right">
            <view class="top">
              <view class="name">{{res.createUser?res.createUser.name:'--'}}</view>
              <view class="like" :class="{ highlight: res.isTop }">
                <view class="num">{{ res.isTop?'置顶':'' }}</view>
                <u-icon v-if="!res.isTop" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
                <u-icon v-if="res.isTop" name="thumb-up-fill" :size="30" @click="getLike(index)"></u-icon>
              </view>
            </view>
            <view class="content">{{ res.content }}</view>
            <view class="reply-box">
              <view class="item" v-for="(item, index) in res.replyCommentList" :key="item._id">
                <view class="username">{{item.replyUser?item.replyUser.name:'--'}}</view>
                <view class="text">{{ item.content }}</view>
              </view>
              <view class="all-reply" @tap="toAllReply">
                共{{ res.replyCommentNum }}条回复
                <u-icon class="more" name="arrow-right" :size="26"></u-icon>
              </view>
            </view>
            <view class="bottom">
              {{ res.createTime }}
              <view class="reply">回复</view>
            </view>
          </view>
        </view>
        <u-loadmore :status="pageObj.pageStatus" :load-text="loadText" @loadmore='getCommentList' margin-top='30' margin-bottom='30' />
      </view>
    </view>
    <view class="detail-bottom">
      <u-icon name="home" size='48' @click='backHome'></u-icon>
      <view class="bottom-comment">
        <u-search shape="round" action-text='发送' :clearabled="true" maxlength='200' placeholder="评论..." v-model="commentValue" @custom='commentSubmit' @search='commentSubmit'></u-search>
      </view>
      <u-icon :color="isLike?'#dd524d':'#808080'" :name="isLike?'heart-fill':'heart'" size='48' @click='likeClick'></u-icon>
    </view>
    <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
    <login-modal :modelShow='modelShow' @closeModal='modelShow = false'></login-modal>
    <u-toast ref="uToast" />
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
    modelShow: false,
    scrollTop: 0,
    articleId: '',
    articleData: {
      meta: {}
    },
    commentList: [],
    commentValue: '',
    isLike: false,
    pageObj: {
      pageSize: 1,
      pageStatus: 'loadmore'
    },
    loadText: {
      loadmore: '点击或上拉加载更多评论',
      loading: '正在加载...',
      nomore: '没有更多了'
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
      if(data.linkUser.length > 0 && this.vuex_userInfo.id){
        let userId = this.vuex_userInfo.id;
        this.isLike = data.linkUser.some(({_id})=>_id == userId);
      }
      this.getCommentList();
    },
    // 获取文章详情
    async getArticleDetail(){
      let result = await this.$u.api.article.articleDetail({
        id: this.articleId
      })
      return result;
    },
    // 获取评论列表
    getCommentList(){
      let {articleId, pageObj} = this;
      this.$u.api.article.articleCommentList({
        articleId: articleId,
        currentPage: pageObj.pageSize,
        pageSize: 20,
        status: "1"
      }).then(res=>{
        console.info('articleCommentList')
        console.info(res)
        pageObj.pageSize = pageObj.pageSize + 1;
        let dataList = res.data.data;
        if(dataList.length > 0){
          dataList.forEach(item=>{
            item.avatarImg = item.createUser?`${baseURL}/blogAdmin/file/down?downId=${item.createUser.avatarId}`:'';
          })
          this.commentList = this.commentList.concat(dataList);
          if(this.commentList.length == res.data.count){
            pageObj.pageStatus = 'nomore';
          }else{
            pageObj.pageStatus = 'loadmore';
          }
        }else{
          pageObj.pageStatus = 'nomore';
        }
      })
    },
    // 点赞
    likeClick(){
      if(this.vuex_userInfo.id){
        let {articleId, isLike, articleData, vuex_userInfo} = this;
        this.$u.api.article.articleLike({
          id: articleId,
          type: isLike ? "0" : "1"
        }).then(res=>{
          if (isLike) {
            articleData.meta.likeTotal -= 1;
            articleData.linkUser = articleData.linkUser.filter(item => {
              item._id != vuex_userInfo.id;
            });
            this.$u.toast('已取消点赞');
          } else {
            articleData.meta.likeTotal += 1;
            articleData.linkUser.push({
              avatarId: vuex_userInfo.avatarId,
              _id: vuex_userInfo.id,
              name: vuex_userInfo.name
            });
            this.$refs.uToast.show({
              title: '点赞成功',
              type: 'success'
            })
          }
          this.isLike = !isLike;
        }).catch(res=>{
          if(res.statusCode == 403){
            this.$u.toast('token失效，请重新登录');
            this.modelShow = true;
          }
        })
      }else{
        this.modelShow = true;
        this.$u.toast('点赞前，请先登录');
      }
    },
    // 评论提交
    commentSubmit(){
      if(!this.commentValue){
        return this.$u.toast('请输入评论内容');
      }
      if(this.vuex_userInfo.id){

      }else{
        this.modelShow = true;
        this.$u.toast('评论前，请先登录');
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
  onReachBottom() {
    if(this.pageObj.pageStatus == 'loadmore'){
      this.getCommentList();
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
    .content-comment{
      .comment {
        display: flex;
        padding: 30rpx;
        .left {
          image {
            width: 64rpx;
            height: 64rpx;
            border-radius: 50%;
            background-color: #f2f2f2;
          }
        }
        .right {
          flex: 1;
          padding-left: 20rpx;
          font-size: 30rpx;
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10rpx;
            .name {
              color: #5677fc;
            }
            .like {
              display: flex;
              align-items: center;
              color: #9a9a9a;
              font-size: 26rpx;
              .num {
                margin-right: 4rpx;
                color: #9a9a9a;
              }
            }
            .highlight {
              color: #5677fc;
              .num {
                color: #5677fc;
              }
            }
          }
          .content {
            margin-bottom: 10rpx;
          }
          .reply-box {
            background-color: rgb(242, 242, 242);
            border-radius: 12rpx;
            .item {
              padding: 20rpx;
              border-bottom: solid 2rpx $u-border-color;
              .username {
                font-size: 24rpx;
                color: #999999;
              }
            }
            .all-reply {
              padding: 20rpx;
              display: flex;
              color: #5677fc;
              align-items: center;
              .more {
                margin-left: 6rpx;
              }
            }
          }
          .bottom {
            margin-top: 20rpx;
            display: flex;
            font-size: 24rpx;
            color: #9a9a9a;
            .reply {
              color: #5677fc;
              margin-left: 10rpx;
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
