<template>
  <div class="wrapper">
    <header-nav></header-nav>
    <div class="wrapper-index">
      <div class="index-router">
        <Nuxt />
      </div>
      <side-bar :objData='objData'></side-bar>
    </div>
    <div class="wrapper-footer">
      <a href="http://www.beian.miit.gov.cn/">æ¹˜ICPå¤‡20010588å�·</a>
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import SideBar from '@/components/SideBar'
import moment from 'moment'
export default {
  data() {
    return {

    }
  },
  async asyncData({ $axios }) {
    // 获取励志语
    let statementRes = await $axios.get('/blogPage/statement/list')
    // 获取文章标签列表
    let tagRes = await $axios.get('/blogPage/statistics/tagList')
    // 获取友情链接
    let linkRes = await $axios.get('/blogPage/link/list', {
      params: {
        currentPage: '1',
        pageSize: '99',
        sortBy: 'createTime',
        sortOrders: '1',
      }
    })

    let mottoArr = statementRes.data
    let week = moment().day()

    let tagList = tagRes.data
    if(tagList.length > 0){
      tagList.forEach(item => {
        item.name = item._id.name
        item.bgColor = item._id.bgColor
        item._id = item._id.id
      })
    }
    let linkList = linkRes.data.data
    let objData = {
      motto: mottoArr[week]?mottoArr[week].title:'愿你成为自己喜欢的模样，不抱怨，不将就',
      tagList,
      linkList
    }
    return { objData }
  },
  created() {
    this.$router.push('/article/page');
  },
  mounted() {

  },
  methods: {

  },
  watch: {

  },
  components: {
    HeaderNav,
    SideBar
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .wrapper-index{
    width: 1200px;
    margin: 0 auto;
    padding-top: 100px;
    position: relative;
    display: flex;
    .index-router{
      flex: 1;
    }
  }
  .wrapper-footer{
    text-align: center;
    padding: 10px 0;
    font-size: 16px;
    display: none;
  }
</style>