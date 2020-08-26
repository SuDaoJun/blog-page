<template>
  <div class="wrapper">
    <div class="wrapper-index">
      <div class="wrapper-article">
         <div class="article-list" style="overflow:auto">
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
         <div class="article-all" v-if="articleList.length == 0">
           <empty-show :hide='true' type='slot' showTxt='暂无更多文章'>
           </empty-show>
         </div>
        <div class="page-list">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="pageSize"
            :current-page='currentPage'
            :hide-on-single-page='true'
            :total="total"
            @current-change='currentChange'
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyShow from '@/components/EmptyShow'
import { baseURL } from '@/utils/index'
export default {
  data() {
    return {
      baseURL: baseURL,
      pageSize: 6,
      currentPage: 1
    }
  },
  head(){
    return {
      title: '文章列表-博客',
      meta: [{
        hid: "description",
        name: "description",
        content: "前端文章"
      },{
        hid: 'keywords',
        name: 'keywords',
        content: '前端文章'
      }]
    }
  },
  created() {

  },
  async asyncData({ $axios , params, store}) {
    let articleFilter = store.state.articleFilter
    const res = await $axios.get('/blogPage/article/list', 
    {
      params: {
      currentPage: params.num?params.num:1,
      pageSize: 6,
      tags: articleFilter.tags,
      sortBy: articleFilter.sortBy,
      sortOrders: '-1'
    }}
    )
    let articleList = res.data.data
    let total = res.data.count
    return { articleList, total }
  },
  mounted() {
    this.currentPage = this.$route.params.num?parseInt(this.$route.params.num):1
  },
  methods: {
    getDataList(){
      let { pageSize, currentPage, articleFilter} = this
      this.$axios.get('/blogPage/article/list',{
        params: {
        currentPage,
        pageSize,
        tags: articleFilter.tags,
        sortBy: articleFilter.sortBy,
        sortOrders: '-1'
      }}).then(res =>{
        let code = res.code
        if(code === this.$constant.reqSuccess){
          this.total = res.data.count;
          this.articleList = res.data.data
        }else{
          this.$message.warning('获取文章列表失败')
        }
      })
    },
    articleDetail(id){
      this.$router.push({path: `/articleDetail/${id}`})
    },
    currentChange(page){
      this.$router.push(`/article/page/${page}`);
    }
  },
  watch: {
    articleFilter: {
      // 这里不能使用箭头函数，不然this指向就不是vue组件里面的this了
      handler: function(val) {
        this.getDataList()
      },
      deep: true
    }
  },
  components: {
    EmptyShow
  },
  computed: {
    articleFilter(){
      return this.$store.state.articleFilter
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