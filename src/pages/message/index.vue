<template>
  <view class="index-message">
    <nav-header title='留言'></nav-header>
    <view class="message-banner">
      <u-image width="100%" height="440rpx" error-icon='photo' mode='scaleToFill' :src="messageBg"></u-image>
      <message-barrage ref='messageBarrage' @end="dataEnd"></message-barrage>
    </view>
    <view class="message-search">
      <u-search shape="round" action-text='发送' :disabled='messageDisabled' :clearabled="true" maxlength='200' placeholder="留言...." v-model="messageValue" @custom='messageSubmit' @search='messageSubmit'></u-search>
    </view>
    <view class="message-list">
      <view class="list-title u-border-bottom">
        <text>留言足迹</text>
        <text class='box-num'>共{{pageObj.total}}条留言</text>
      </view>
      <view class="list-box" v-for="item in messageList" :key='item._id'>
        <view class="box-img">
          <u-avatar size='64' :src='item.avatarImg' ></u-avatar>
        </view>
        <view class="box-content">
          <view class="content-name">{{item.createUser?item.createUser.name:'--'}}</view>
          <view class="content-txt">{{item.content}}</view>
          <view class="content-time">{{item.createTime}}</view>
        </view>
      </view>
      <u-loadmore :status="pageObj.pageStatus" :load-text="loadText" @loadmore='getMessageList' margin-top='30' margin-bottom='30' />
    </view>
    <u-back-top :scroll-top="scrollTop" :duration='200'></u-back-top>
    <login-modal :modelShow='modelShow' @closeModal='modelShow = false'></login-modal>
  </view>
</template>

<script>
import { baseURL, messageBg } from '@/utils'
import MessageBarrage from '@/components/MessageBarrage'
import LoginModal from '@/components/LoginModal'
export default {
  components: {
    MessageBarrage,
    LoginModal
  },
  data(){
    return {
      messageBg,
      messageList: [],
      randomMessageList: [],
      messageValue: '',
      messageDisabled: false,
      modelShow: false,
      scrollTop: 0,
      pageObj: {
        pageSize: 1,
        total: 0,
        pageStatus: 'loadmore'
      },
      loadText: {
        loadmore: '点击或上拉加载更多留言',
        loading: '正在加载留言...',
        nomore: '没有更多留言了'
      }
    }
  },
  computed: {},
  methods: {
    // 获取留言列表
    async getMessageList(){
      let pageObj = this.pageObj;
      pageObj.pageStatus = 'loading';
      let result = await this.$u.api.message.messageList({
        currentPage: pageObj.pageSize,
        pageSize: 10
      })
      pageObj.pageSize = pageObj.pageSize + 1;
      pageObj.total = result.data.count;
      let dataList = result.data.data;
      if(dataList.length > 0){
        dataList.forEach(item=>{
          item.avatarImg = item.createUser?`${baseURL}/blogAdmin/file/down?downId=${item.createUser.avatarId}`:'';
          item.createTime = item.createTime.split(' ')[0];
        })
        this.messageList = this.messageList.concat(dataList);
        if(this.messageList.length == result.data.count){
          pageObj.pageStatus = 'nomore';
        }else{
          pageObj.pageStatus = 'loadmore';
        }
      }else{
        pageObj.pageStatus = 'nomore';
      }
    },
    // 获取随机留言
    getRandomMessageList(){
      this.$u.api.message.messageRandom({
        num: 99
      }).then(res=>{
        this.randomMessageList = res.data;
        this.$refs.messageBarrage.start(this.randomMessageList);
      })
    },
    // 弹幕结束回调
    dataEnd(){
      this.getRandomMessageList();
    },
    // 重新加载评论
    reloadMessage(){
      this.pageObj.pageSize = 1;
      this.pageObj.total = 0;
      this.pageObj.pageStatus = 'loading';
      this.messageList = [];
      this.getMessageList();
    },
    // 评论提交
    messageSubmit(){
      if(!this.messageValue){
        return this.$u.toast('请输入留言内容');
      }
      if(this.vuex_userInfo.id){
        let { messageValue, messageDisabled} = this;
        if(!messageDisabled){
          this.messageDisabled= true;
          this.$u.api.message.messageAdd({
            content: messageValue
          }).then(res=>{
            this.messageDisabled = false;
            this.$refs.messageBarrage.add(messageValue);
            this.messageValue = '';
            this.reloadMessage();
          }).catch((res)=>{
            this.messageDisabled = false;
            if(res.statusCode == 403){
              this.modelShow = true;
            }
          })
        }
      }else{
        this.modelShow = true;
        this.$u.toast('留言前，请先登录');
      }
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.getMessageList();
    this.getRandomMessageList();
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {
    if(this.$refs.messageBarrage){
      this.$refs.messageBarrage.start(this.randomMessageList);
    }
  },
  // 页面周期函数--监听页面隐藏
  onHide() {
    this.$refs.messageBarrage.clear();
  },
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {
    if(this.pageObj.pageStatus == 'loadmore'){
      this.getMessageList();
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
.message-banner{
  width: 100vw;
  overflow: hidden;
  position: relative;
}
.message-search{
  background-color: #fff;
  margin: 20rpx 0 40rpx;
  padding: 20rpx;
}
.message-list{
  padding: 0 40rpx;
  .list-title{
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
    margin-bottom: 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .box-num{
      color: #808080;
      font-size: 24rpx;
    }
  }
  .list-box{
    padding: 10px;
    display: flex;
    background-color: #fff;
    margin-bottom: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .box-content{
      flex: 1;
      padding-left: 20rpx;
      .content-txt{
        margin: 6rpx 0;
      }
      .content-time{
        color: #9a9a9a;
        font-size: 24rpx;
      }
    }
  }
}
</style>
