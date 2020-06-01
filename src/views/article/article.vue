<template>
  <div class="wrapper-article">
     <div class="article-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="disabled" style="overflow:auto">
       <div v-for="item in articleList" class="list-item" @click='articleDetail(item._id)'>
         <div class="item-info">
           <div class="info-text">
             <h3>{{item.title}}</h3>
             <div class="text-desc">
               简介：{{item.description?item.description:'暂无'}}
             </div>
             <div class="text-tag">
               标签：
               <tag-box :tagList='item.tags'></tag-box>
             </div>
           </div>
           <div class="info-data">
             <div class="data-view">
               <i class='el-icon-view'></i>
               <span>{{item.meta.viewTotal}}</span>
             </div>
             <div class="data-view">
               <i class='el-icon-chat-round'></i>
               <span>{{item.meta.commentTotal}}</span>
             </div>
             <div class="data-view">
               <i class='mio-icon-zan iconfont'></i>
               <span>{{item.meta.likeTotal}}</span>
             </div>
             <div class="data-view">
               创建时间：{{item.createTime}}
             </div>
             <div class="data-view">
               {{item.createUser?'作者：'+item.createUser.name:''}}
             </div>
           </div>
         </div>
         <el-image v-if='item.imgId' class='item-img' :src='baseURL+"/blogAdmin/file/down?downId="+item.imgId' fit='contain'>
           <div slot="error" class="img-error">
             <i class="el-icon-picture-outline"></i>
           </div>
         </el-image>
         <div v-else class="item-img">
           <div class="img-error">
             <i class="el-icon-picture-outline"></i>
           </div>
         </div>
       </div>
     </div>
     <div class="article-load"
        v-if="loading" 
        v-loading="loading"
        element-loading-text="文章加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
     </div>
     <div class="article-all" v-if="noMore">
       <empty-show :hide='true' type='slot' showTxt='暂无更多文章'>
       </empty-show>
     </div>
  </div>
</template>

<script>
import EmptyShow from '@/components/EmptyShow'
import TagBox from '@/components/TagBox'
export default {
  data() {
    return {
      baseURL: this.$baseURL,
      articleList: [],
      loading: false,
      pageObj: {
        pageSize: 5,
        total: 0,
        currentPage: 1
      }
    }
  },
  created() {
    this.getDataList()
  },
  mounted() {
    
  },
  methods: {
    getDataList(page){
      let { pageObj, sortBy, articleFilter} = this
      pageObj.currentPage = page === true?pageObj.currentPage:1;
      this.$api.article.articleList({
        currentPage: pageObj.currentPage,
        pageSize: pageObj.pageSize,
        tags: articleFilter.tags,
        sortBy: articleFilter.sortBy,
        sortOrders: '-1'
      }).then(res =>{
        console.log(res)
        let code = res.code
        if(code === this.$constant.reqSuccess){
          this.pageObj.total = res.data.count;
          if(page === 'reset'){
            this.articleList = res.data.data
          }else{
            this.articleList = [...this.articleList, ...res.data.data]
          }
        }else{
          this.$message.warning('获取文章列表失败')
        }
      })
    },
    loadMore(){
      this.loading = true
      setTimeout(() => {
        this.pageObj.currentPage += 1;
        this.getDataList(true)
        this.loading = false
      }, 400)
    },
    articleDetail(id){
      this.$router.push({path: '/articleDetail', query: {articleId: id}})
    }
  },
  watch: {
    articleFilter: {
      // 这里不能使用箭头函数，不然this指向就不是vue组件里面的this了
      handler: function(val) {
        this.getDataList('reset')
      },
      deep: true
    }
  },
  components: {
    EmptyShow,
    TagBox
  },
  computed: {
    noMore () {
      return this.articleList.length >= this.pageObj.total
    },
    disabled () {
      return this.loading || this.noMore
    },
    articleFilter(){
      return this.$store.getters.getFilterObj
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper-article{
  padding-bottom: 40px;
  .article-list{
    .list-item{
      padding: 20px;
      background-color: #fff;
      border: 1px solid #f0f0f0;
      margin-bottom: 30px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .item-info{
        min-height: 120px;
        padding-right: 40px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .info-text{
          h3{
            color: #333;
            margin-bottom: 20px;
            font-weight: 600;
            font-size: 20px;
            @include mulOverRow;
          }
          .text-desc{
            color: #666;
            @include mulOverRow;
          }
          .text-tag{
            color: #666;
            margin: 10px 0;
            display: flex;
            align-items: center;
          }
        }
        .info-data{
          display: flex;
          align-items: center;
          .data-view{
            margin-right: 20px;
            color: #b4b4b4;
          }
        }
      }
      .item-img{
        width: 125px;
        height: 100px;
        flex-shrink: 0;
        /deep/ .img-error{
          width: 125px;
          height: 100px;
          background-color: #f5f7fa;
          color: #909399;
          border-radius: 4px;
          font-size: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .article-all{
    position: relative;
  }
}
</style>