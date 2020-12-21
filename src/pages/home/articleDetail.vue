<template>
  <view class='article-detail'>
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
     <view class="content-box">
       <view class="box-title u-border-bottom">
         <text>点个赞</text>
       </view>
       <view class="box-like">
         <view class="like-total">
           <text>{{articleData.meta.likeTotal}}人已赞</text>
           <u-icon :color="isLike?'#dd524d':'#808080'" :name="isLike?'heart-fill':'heart'" size='48' @click='likeClick'></u-icon>
         </view>
         <view class="like-list" v-show='articleData.linkUser && articleData.linkUser.length > 0'>
           <view class="list-box u-line-1" v-for='item in articleData.linkUser' :ke='item._id'>
             <u-avatar size='80' :src='baseURL+"/blogAdmin/file/down?downId="+item.avatarId' ></u-avatar>
             <text>{{item.name}}</text>
           </view>
         </view>
       </view>
     </view>
     <view class="content-box">
       <view class="box-title u-border-bottom">
         <text>文章评论</text>
         <text class='box-num'>有{{pageObj.total}}条评论</text>
       </view>
     </view>
      <view class="content-comment">
        <view class="comment" v-for="(res, index) in commentList" :key="res._id">
          <view class="left">
            <u-avatar size='64' :src='res.avatarImg' ></u-avatar>
          </view>
          <view class="right">
            <view class="top">
              <view class="name">{{res.createUser?res.createUser.name:'--'}}</view>
              <view class="like" v-show='res.isTop'>
                <u-tag text="置顶" mode='dark'  size='mini' type='warning' shape='circle'  />
              </view>
            </view>
            <view class="content">{{ res.content }}</view>
            <view class="reply-box" v-if='res.replyCommentList && res.replyCommentList.length > 0'>
              <view class="item" v-for="(item, index) in res.replyLimitCommentList" :key="item._id">
                <view class="username">
                  <text>{{item.replyUser?item.replyUser.name:'--'}}</text>
                  <view class="usename-box" v-show='item.toUser && item.replyUser && item.toUser._id !==  item.replyUser._id'>
                    <text class='box-replay'>回复</text>
                    <text>{{item.toUser?item.toUser.name:'--'}}：</text>
                  </view>

                </view>
                <view class="text">{{ item.content }}</view>
              </view>
              <view class="all-reply" @click="toAllReply(res)">
                共{{ res.replyCommentNum }}条回复
                <u-icon class="more" name="arrow-right" :size="24"></u-icon>
              </view>
            </view>
            <view class="bottom">
              {{ res.createTime }}
              <view class="reply" @click='replyComment(res.createUser, res._id)'>
                <u-icon name='chat' size='26'></u-icon>
                <text>回复</text>
              </view>
            </view>
          </view>
        </view>
        <u-loadmore :status="pageObj.pageStatus" :load-text="loadText" @loadmore='getCommentList' margin-top='30' margin-bottom='30' />
      </view>
    </view>
    <view :class="heightChange?'detail-bottom detail-change':'detail-bottom'" :style="{boxShadow: popupShow?'none':'0 -4rpx 20rpx rgba(0, 0, 0, 0.1)'}">
      <u-icon name="home" size='48' @click='backHome'></u-icon>
      <view class="bottom-comment">
        <u-search shape="round" action-text='发送' :focus='commentObj.commentFocus' :disabled='commentObj.commentDisabled' :clearabled="true" maxlength='200' :placeholder="commentObj.commentPlaceholder" v-model="commentValue" @custom='commentSubmit' @search='commentSubmit' @blur='inputBlur' @focus='inputFocus'></u-search>
      </view>
      <u-icon :color="isLike?'#dd524d':'#808080'" :name="isLike?'heart-fill':'heart'" size='48' @click='likeClick'></u-icon>
    </view>
    <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
    <login-modal :modelShow='modelShow' @closeModal='modelShow = false'></login-modal>
    <u-toast ref="uToast" />
    <u-popup v-model="popupShow" mode='bottom' :mask-close-able='false' border-radius='16' z-index='9998' :closeable='true'>
      <view class='popup-box content-comment'>
        <view class="box-title">
          评论详情
        </view>
        <view class="box-comment">
          <view class="left">
            <u-avatar size='64' :src='popupCommentObj.avatarImg' ></u-avatar>
          </view>
          <view class="right">
            <view class="top">
              <view class="name">{{popupCommentObj.createUser?popupCommentObj.createUser.name:'--'}}</view>
              <view class="like" v-show='popupCommentObj.isTop'>
                <u-tag text="置顶" mode='dark'  size='mini' type='warning' shape='circle'  />
              </view>
            </view>
            <view class="content">{{ popupCommentObj.content }}</view>
            <view class="bottom">
              {{ popupCommentObj.createTime }}
              <view class="reply" @click='replyComment(popupCommentObj.createUser, popupCommentObj._id)'>
                <u-icon name='chat' size='26'></u-icon>
                <text>回复</text>
              </view>
            </view>
          </view>
        </view>
        <view class="reply-title">全部回复（{{popupCommentObj.replyCommentNum}}）</view>
        <view class="box-reply" v-if='popupCommentObj.replyCommentList && popupCommentObj.replyCommentList.length > 0'>
          <view class="reply-item u-border-bottom" v-for="(item, index) in popupCommentObj.replyCommentList" :key="item._id">
            <view class="item-left">
              <u-avatar size='64' :src="item.replyUser?baseURL+'/blogAdmin/file/down?downId='+item.replyUser.avatarId:''"></u-avatar>
            </view>
            <view class="item-right">
              <view class="right-username">
                <text>{{item.replyUser?item.replyUser.name:'--'}}</text>
                <view class="usename-box" v-show='item.toUser && item.replyUser && item.toUser._id !==  item.replyUser._id'>
                  <text class='box-txt'>回复</text>
                  <text>{{item.toUser?item.toUser.name:'--'}}：</text>
                </view>
              </view>
              <view class="right-content">{{ item.content }}</view>
              <view class="right-bottom">
                {{ item.createTime }}
                <view class="reply" @click='replyComment(item.replyUser, item.commentId)'>
                  <u-icon name='chat' size='26'></u-icon>
                  <text>回复</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
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
    windowHeight: 0,
    heightChange: false,
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
      pageStatus: 'loadmore',
      total: 0
    },
    loadText: {
      loadmore: '点击或上拉加载更多评论',
      loading: '正在加载评论...',
      nomore: '没有更多评论了'
    },
    commentObj: {
      commentPlaceholder: '评论....',
      commentDisabled: false,
      commentFocus: false,
      replyId: '',
      commentId: '',
    },
    popupShow: false,
    popupCommentObj: {}
  }),
  computed: {

  },
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
        pageObj.total = res.data.count;
        if(dataList.length > 0){
          dataList.forEach(item=>{
            item.avatarImg = item.createUser?`${baseURL}/blogAdmin/file/down?downId=${item.createUser.avatarId}`:'';
            if(item.replyCommentList.length > 0){
              item.replyLimitCommentList = item.replyCommentList.slice(0,2);
            }
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
              return item._id != vuex_userInfo.id;
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
        let { articleId, commentValue, commentObj} = this;
        if(!commentObj.commentDisabled){
          this.commentObj.commentDisabled = true;
          if(commentObj.replyId){
            // 回复评论
            this.$u.api.article.replyCommentAdd({
              articleId: articleId,
              commentId: commentObj.commentId,
              toUser: commentObj.replyId,
              content: commentValue
            }).then(res=>{
              this.commentObj.commentDisabled = false;
              this.commentValue = '';
              this.commentObj.commentPlaceholder = '评论....';
              this.popupShow = false;
              this.reloadComment();
            }).catch(()=>{
              this.commentObj.commentDisabled = false;
            })
          }else{
            // 添加评论
            this.$u.api.article.articleComment({
              articleId: articleId,
              content: commentValue
            }).then(res=>{
              this.commentObj.commentDisabled = false;
              this.commentValue = '';
              this.popupShow = false;
              this.reloadComment();
            }).catch(()=>{
              this.commentObj.commentDisabled = false;
            })
          }
        }
      }else{
        this.modelShow = true;
        this.$u.toast('评论前，请先登录');
      }
    },
    // 回复评论赋值聚焦
    replyComment(item, commentId){
      // 回复评论
      this.commentObj.replyId = item._id;
      this.commentObj.commentId = commentId;
      this.commentObj.commentPlaceholder = `回复 @${item.name}：`;
      this.commentObj.commentFocus = true;
    },
    // 评论输入框失焦
    inputBlur(){
      this.commentObj.commentPlaceholder = '评论....';
    },
    // 评论输入框聚焦
    inputFocus(){
      if(this.commentObj.commentPlaceholder == '评论....'){
        this.commentObj.replyId = '';
        this.commentObj.commentId = '';
        this.commentObj.commentFocus = false;
      }
    },
    // 获取回复评论
    toAllReply(item){
      console.info(item)
      this.popupCommentObj = item;
      this.popupShow = true;
    },
    // 重新加载评论
    reloadComment(){
      this.pageObj.pageSize = 1;
      this.pageObj.pageStatus = 'loading';
      this.commentList = [];
      this.getCommentList();
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
    try {
        const res = uni.getSystemInfoSync();
        this.windowHeight = res.windowHeight;
    } catch (e) {
        // error
    }
    uni.onWindowResize((res) => {
      if(this.windowHeight - res.size.windowHeight > 80){
        this.heightChange = true
      }else{
        this.heightChange = false
      }
    })
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
    .content-box{
      margin-bottom: 40rpx;
      .box-title{
        &::before{
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50rpx;
          height: 4rpx;
          background-color: #82848a;
        }
        padding-bottom: 16rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        .box-num{
          color: #808080;
        }
      }
      .box-like{
        margin: 40rpx 0;
        .like-total{
          margin-bottom: 30rpx;
          display: flex;
          align-items: center;
          text{
            margin-right: 40rpx;
            color: #808080;
          }
        }
        .like-list{
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          .list-box{
            width: 80rpx;
            margin: 0 40rpx 30rpx 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            text{
              margin-top: 8rpx;
              color: #666;
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
    position: fixed;
    background-color: #fff;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    z-index: 9999;
    &.detail-change{
      height: 160rpx;
      align-items: flex-start;
      padding-top: 20rpx;
    }
    .bottom-comment{
      flex: 1;
      padding: 0 40rpx;
    }
  }
}
.content-comment{
  .comment,.box-comment {
    padding: 20rpx;
    display: flex;
    background-color: #fff;
    margin-bottom: 30rpx;
    border-radius: 10rpx;
    box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.1);
    .right {
      flex: 1;
      padding-left: 20rpx;
      font-size: 30rpx;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10rpx;
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
            display: flex;
            align-items: center;
            font-size: 24rpx;
            color: #303133;
            margin-bottom: 10rpx;
            .box-replay{
              color: #9a9a9a;
              margin: 0 10rpx;
            }
          }
        }
        .all-reply {
          font-size: 24rpx;
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
        align-items: center;
        justify-content: space-between;
        font-size: 24rpx;
        color: #9a9a9a;
        .reply {
          color: #5098FF;
          text{
            margin-left: 6rpx;
          }
        }
      }
    }
  }
}
.popup-box{
  padding: 30rpx 40rpx 140rpx 40rpx;
  .box-title{
    text-align: center;
    font-size: 32rpx;
    font-weight: 600;
    margin-bottom: 30rpx;
  }
  .reply-title{
    font-weight: 600;
    margin-bottom: 20rpx;
  }
  .box-reply{
    height: 520rpx;
    overflow-y: scroll;
    .reply-item{
      padding: 20rpx 0;
      display: flex;
      .item-right{
        flex: 1;
        padding-left: 20rpx;
        .right-username{
          display: flex;
          align-items: center;
          font-size: 24rpx;
          color: #303133;
          margin-bottom: 10rpx;
          .box-txt{
            color: #9a9a9a;
            margin: 0 10rpx;
          }
        }
        .right-content{
          margin-bottom: 20rpx;
        }
        .right-bottom {
          margin-top: 20rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 24rpx;
          color: #9a9a9a;
          .reply {
            color: #5098FF;
            text{
              margin-left: 6rpx;
            }
          }
        }
      }
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
