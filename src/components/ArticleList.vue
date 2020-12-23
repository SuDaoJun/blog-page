<template>
  <view class="home-article">
      <view class="article-item u-border-bottom" v-for="(item, index) in articleList" :key="item._id" @click='articleDetail(item._id)'>
        <view class="item-img">
          <u-image  mode="scaleToFill" error-icon='photo' :height='128' :src="item.image"></u-image>
        </view>
        <view class="item-box">
          <view class="box-info">
            <view class='box-title u-line-1' v-html='item.title'></view>
            <view class='box-desc u-line-1'>{{item.description}}</view>
          </view>
          <view class="box-bottom">
            <view class="bottom-item">
              <u-icon name="clock"></u-icon>
              <text class='item-value'>{{item.createTime}}</text>
            </view>
            <view class="bottom-item">
              <u-icon name="pinglun" custom-prefix="custom-icon"></u-icon>
              <text class='item-value'>{{item.meta.commentTotal}}</text>
            </view>
            <view class="bottom-item">
              <u-icon name="thumb-up"></u-icon>
              <text class='item-value'>{{item.meta.likeTotal}}</text>
            </view>
            <view class="bottom-item">
              <u-icon name="eye"></u-icon>
              <text class='item-value'>{{item.meta.viewTotal}}</text>
            </view>
          </view>
        </view>
      </view>
      <u-loadmore :status="status" :load-text="loadText" @loadmore='loadmore' margin-top='30' margin-bottom='30' />
    </view>
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array,
      default: ()=>{
        return []
      }
    },
    status: {
      type: String,
      default: 'loadmore'
    },
    loadText: {
      type: Object,
      default: ()=>{
        return {
          loadmore: '点击或上拉加载更多文章',
          loading: '正在加载文章...',
          nomore: '没有更多文章了'
        }
      }
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    articleDetail(id){
      this.$u.routePath.navigateTo('/pages/home/articleDetail', {
        articleId: id
      });
    },
    loadmore(){
      this.$emit('loadmore','');
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="scss" scoped>
.home-article{
  padding-bottom: 2rpx;
  .article-item{
    background-color: #fff;
    padding: 15rpx 30rpx;
    display: flex;
    .item-img{
      width: 200rpx;
      height: 128rpx;
      margin-right: 30rpx;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .item-box{
      width: 460rpx;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      .box-title{
        /deep/ span{
          color: #1BA2E8;
        }
      }
      .box-desc{
        font-size: 24rpx;
        color: #808080;
        margin-top: 6rpx;
      }
      .box-bottom{
        font-size: 24rpx;
        display: flex;
        align-items: center;
        color: #808080;
        .bottom-item{
          margin-right: 20rpx;
          .item-value{
            margin-left: 6rpx;
          }
        }
      }
    }
  }
}
</style>
