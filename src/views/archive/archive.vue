<template>
  <div class="wrapper">
     <div class="wrapper-archive">
       <h3>共{{total}}篇文章</h3>
       <el-timeline>
         <el-timeline-item
           v-for="(item, index) in articleList"
           :key="item._id"
           color="#1abc9c"
           placement="top"
           :timestamp="item.month">
           <div class="list-card">
             <div class="card-box" v-for='dataItem in item.articleArr' :key='dataItem.articleId'>
               <p>{{dataItem.createTime.split(' ')[0]}}</p>
               <h4 @click='articleDetail(dataItem.articleId)'>{{dataItem.title}}</h4>
             </div>
           </div>
         </el-timeline-item>
       </el-timeline>
     </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      articleList: []
    }
  },
  created() {

  },
  mounted() {
    this.getDataList()
  },
  methods: {
    getDataList(page){
      this.$api.statistics.articleArchive().then(res =>{
        console.log(res)
        let code = res.code
        if(code === this.$constant.reqSuccess){
         this.total = res.data.length
         let data = res.data
         let arr = []
         if(data.length > 0){
           data.forEach(item=>{
             let outerObj = { month: item._id.month, articleArr: [] }
             let inObj = { articleId: item._id.id, title: item._id.title, createTime: item._id.createTime}
             outerObj.articleArr.push(inObj);
             arr.push(outerObj);
           })
           arr = this.handleData(arr)
         }
         this.articleList = arr
        }else{
          this.$message.warning('获取文章归档统计失败')
        }
      })
    },
    handleData(arr){
      let newData = []; // 目标数组
      let newObj = {};
      arr.forEach((item, index) => {
        if (!newObj[item.month]) {
          newData.push(item);
          newObj[item.month] = true;
        } else {
          newData.forEach(data => {
            if (data.month === item.month) {
              data.articleArr = [...data.articleArr, ...item.articleArr]
            }
          })
        }
      })
      return newData
    },
    articleDetail(articleId){
      this.$router.push({path: '/articleDetail', query: {articleId}})
    }
  },
  watch: {

  },
  components: {

  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .wrapper-archive{
    padding: 0 20px;
    /deep/ .el-timeline-item__timestamp{
      font-size: 20px;
    }
    &>h3{
      color: #909399;
      font-size: 20px;
      margin-bottom: 24px;
      letter-spacing: 2px;
      font-style: italic;
    }
    .list-card{
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      border: 1px solid #EBEEF5;
      background-color: #FFF;
      color: #303133;
      padding: 15px;
      .card-box{
        display: flex;
        align-items: flex-end;
        &:not(:last-child){
          margin-bottom: 20px;
        }
        h4{
          color: #1abc9c;
          font-size: 20px;
          margin-left: 18px;
          letter-spacing: 2px;
          flex: 1;
          cursor: pointer;
          &:hover{
            color: #555;
          }
        }
      }
    }
  }
</style>