<template>
  <div class="wrapper">
     <div class="wrapper-project">
       <div class="project-item" v-for='item in projectList' :key='item._id'>
         <a :href="item.linkUrl" target="_blank">
           <el-image v-if='item.imgId' class='item-img' :src='baseURL+"/blogAdmin/file/down?downId="+item.imgId'>
             <div slot="error" class="img-error">
               <i class="el-icon-picture-outline"></i>
             </div>
           </el-image>
           <div v-else class="item-img">
             <div class="img-error">
               <i class="el-icon-picture-outline"></i>
             </div>
           </div>
           <div class="item-body">
             <div class="body-title">{{item.name}}</div>
             <div class="body-desc">{{item.description}}</div>
             <div class="body-status">
               <span>{{item.startTime}}</span>
               <div class="status-show">
                 <i :style='{background: item.statusColor}'></i>
                 <p>{{item.statusName}}</p>
               </div>
             </div>
           </div>
         </a>
       </div>
       <empty-show :hide='projectList.length === 0' showTxt='暂无项目' iconLeft='25%'></empty-show>
     </div>
  </div>
</template>

<script>
import EmptyShow from '@/components/EmptyShow'
import { baseURL } from "@/utils/index";
export default {
  data() {
    return {
      baseURL: baseURL
    }
  },
  head(){
    return {
      title: '前端项目-博客',
      meta: [{
        hid: "description",
        name: "description",
        content: "前端项目"
      },{
        hid: 'keywords',
        name: 'keywords',
        content: '前端项目'
      }]
    }
  },
  async asyncData({ $axios }) {
    const res = await $axios.get('/blogPage/project/list',{
      params: {
        currentPage: '1',
        pageSize: '99',
        sortBy: 'startTime',
        sortOrders: '-1',
      }
    })
    let projectList = res.data.data
    if(projectList.length > 0){
      projectList.forEach(item=>{
        if(item.status == '1'){
          item.statusName = '已完成'
          item.statusColor = '#67C23A'
        }else if(item.status == '2'){
          item.statusName = '进行中'
          item.statusColor = '#E6A23C'
        }else if(item.status == '3'){
          item.statusName = '已废弃'
          item.statusColor = '#909399'
        }
      })
    }
    return { projectList }
  },
  created() {

  },
  mounted() {
    
  },
  methods: {

  },
  watch: {

  },
  components: {
    EmptyShow
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .wrapper-project{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .project-item{
      width: 380px;
      margin: 0 0 30px 30px;
      a{
        display: block;
        background-color: #fff;
        border: 1px solid #e8e8e8;
        transition: all .4s;
        &:hover{
          border-color: rgba(0,0,0,.09);
          box-shadow: 0 2px 8px rgba(0,0,0,.09);
        }
        .item-img{
          width: 100%;
          height: 250px;
          /deep/ .img-error{
            width: 100%;
            height: 250px;
            background-color: #f5f7fa;
            color: #909399;
            font-size: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .item-body{
          padding: 24px;
          .body-title{
            font-size: 16px;
            margin-bottom: 10px;
            @include overRow;
          }
          .body-desc{
            color: rgba(0,0,0,.45);
            height: 60px;
            margin-bottom: 10px;
            @include mulOverRow(3);
          }
          .body-status{
            color: rgba(0,0,0,.65);
            display: flex;
            align-items: center;
            justify-content: space-between;
            .status-show{
              display: flex;
              align-items: center;
              i{
                width: 6px;
                height: 6px;
                border-radius: 50%;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
</style>