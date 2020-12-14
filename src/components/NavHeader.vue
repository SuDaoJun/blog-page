<template>
  <view class="nav-header">
    <u-navbar :back-text='backText' :is-back="isBack" :title="title" :background="background" :title-color='titleColor' :back-icon-color='backIconColor' :back-text-style='backTextColor' :border-bottom='borderBottom'>
      <view class="slot-wrap" v-if="useSlot">
        <view class="search-wrap">
          <u-search v-model="value" :clearabled="true" maxlength='20' :placeholder="placeholder" :show-action="showAction" height="56" :action-style="{color: '#fff'}" @search="handleSearch" @custom="handleSearch"></u-search>
        </view>
      </view>
      <view class="slot-right" slot='right' v-if='rightSlot'>
        
      </view>
    </u-navbar>
  </view>
</template>

<script>

export default {
  props: {
    backText: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    useSlot: {
      type: Boolean,
      default: false
    },
    keyword: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '文章搜索'
    },
    showAction: {
      type: Boolean,
      default: true
    },
    titleColor: {
      type: String,
      default: '#fff'
    },
    backIconColor: {
      type: String,
      default: '#fff'
    },
    backIconColor: {
      type: String,
      default: '#fff'
    },
    isBack: {
      type: Boolean,
      default: false
    },
    rightSlot: {
      type: Boolean,
      default: false
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    backTextColor: {
      type: Object,
      default: ()=>{
        return {
          color: '#ffffff'
        }
      }
    },
    background: {
      type: Object,
      default: ()=>{
        return {
          backgroundImage: 'linear-gradient(270deg, #1BA2E8, #36EAE8)'
        }
      }
    }
  },
  data: () => ({
    value: ''
  }),
  computed: {},
  methods: {
    handleSearch: function(value){
      this.$emit('handleSearch', value)
    }
  },
  watch: {

  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    this.value = this.keyword;
  },
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
  .slot-wrap {
    display: flex;
    align-items: center;
    flex: 1;
    .search-wrap {
      margin: 0 20rpx 0 60rpx;
      flex: 1;
    }
  }
  .slot-right{
    padding-right: 24rpx;
    color: #fff;
  }
</style>
