<template>
  <div class="side-bar">
    <div class="bar-info">
      <div class="info-avatar" @click='routerHome'>
        <el-image
        :src="require('../assets/img/avatar.png')"></el-image>
      </div>
      <div class="info-title">
        路遥
      </div>
      <div class="info-intro">
        <el-tooltip effect="dark" :content="objData.motto" :disabled='objData.motto.length < 22' placement="top">
          <div class="intro-motto">
            {{objData.motto}}
          </div>
        </el-tooltip>
      </div>
      <div class="info-icon">
        <el-tooltip effect="dark" content="掘金" placement="top">
          <a href="https://juejin.im/user/5afc4e976fb9a07aa2138bdd/posts" target="_blank" class='icon-svg'>
            <svg id="icon-juejin" viewBox="0 0 1024 1024"><path d="M208 479l-44 36 349 276 347-276-44-36-304 239-304-239z" fill='#bba477'></path><path d="M345 368l-42 36 209 166 210-167-46-34-164 130-167-131zM511 235l-70 55 71 56 68-55-69-56z" fill='#bba477'></path></svg>
          </a>
        </el-tooltip>
        <el-tooltip effect="dark" content="码云" placement="top">
          <a href="https://gitee.com/sdj_work" style='font-size: 28px;' target="_blank" class="mio-icon-gitee-fill-round iconfont"></a>
        </el-tooltip>
        <el-tooltip effect="dark" content="博客后台" placement="top">
          <a href="http://sdjblog.cn:8080/" target="_blank" class="mio-icon-icon_caidan iconfont"></a>
        </el-tooltip>
        <el-tooltip effect="dark" content="Github" placement="top">
          <a href="https://github.com/SuDaoJun" target="_blank" class="mio-icon-github iconfont"></a>
        </el-tooltip>
        <el-tooltip effect="dark" content="sdj__work@163.com" placement="top">
          <a href="mailto:sdj__work@163.com" class="el-icon-message"></a>
        </el-tooltip>
      </div>
    </div>
    <div class="bar-tag">
      <div class="tag-title">文章排序</div>
      <div class="tag-list sort-list">
        <div :class="articleFilter.sortBy==item.type?'list-box list-active':'list-box'" v-for='item in articleSort' :key='item.type'>
          <el-tag :type='item.tagType' @click='sortClick(item.type)'>{{item.name}}</el-tag>
        </div>
      </div>
    </div>
    <div class="bar-tag">
      <div class="tag-title">
        文章标签
        <el-link type="primary" v-show='articleFilter.tags' class='all-article' :underline="false" @click.native='tagClick(false)'>全部文章</el-link>
      </div>
      <tag-box :tagList='objData.tagList' :showBorder='true' @tagClick='tagClick'></tag-box>
      <div class="link-empty" v-if='objData.tagList.length == 0'>
        暂无标签
      </div>
    </div>
    <div class="bar-tag">
      <div class="tag-title">友情链接</div>
      <div class="link-list">
        <a :href='item.linkAddress' target="_blank" class="link-box" v-for='item in objData.linkList' :key='item._id'>
          {{item.name}}
        </a>
        <div class="link-empty" v-if='objData.linkList.length == 0'>
          暂无链接
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagBox from '@/components/TagBox'


export default {
  props: {
    objData: {
      type: Object,
      default() {
         return {
           motto: '',
           tagList: [],
           linkList: []
         }
      }
    }
  },
  data() {
    return {
      articleSort: [
        {
          name: '最新',
          type: 'createTime',
          tagType: 'info'
        },
        {
          name: '浏览量',
          type: 'meta.viewTotal',
          tagType: ''
        },
        {
          name: '点赞量',
          type: 'meta.likeTotal',
          tagType: 'success'
        },
        {
          name: '评论量',
          type: 'meta.commentTotal',
          tagType: 'warning'
        },
        {
          name: '字数量',
          type: 'meta.txtTotal',
          tagType: 'danger'
        }
      ]
    }
  },
  created(){

  },
  mounted() {

  },
  methods: {
    routerHome(){
      this.$router.push('/article/page');
    },
    sortClick(type){
      this.$store.commit('changeFilterObj', {sortBy: type})
      this.$router.push('/article/page');
    },
    tagClick(id){
      let tags = id?id:''
      this.$store.commit('changeFilterObj', {tags})
      this.$router.push('/article/page');
    }
  },
  computed: {
    articleFilter(){
      return this.$store.state.articleFilter
    }
  },
  components: {
    TagBox
  }
};
</script>

<style lang="scss" scoped>
.side-bar{
  width: 350px;
  height: calc(100% - 100px);
  margin-left: 30px;
  position: sticky;
  top: 100px;
  z-index: 10;
  .bar-info{
    position: relative;
    padding: 50px 20px 40px;
    background-color: #fff;
    border-radius: 5px;
    color: #bba477;
    margin-bottom: 20px;
    .info-avatar{
      width: 80px;
      height: 80px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: -40px;
      transform: translateX(-50%);
      cursor: pointer;
    }
    .info-title{
      font-size: 24px;
      font-weight: 700;
      text-align: center;
      letter-spacing: 2px;
    }
    .info-intro{
      .intro-motto{
        margin: 20px 0;
        font-weight: 600;
        text-align: center;
        font-size: 14px;
        letter-spacing: 1px;
        @include overRow;
      }
    }
    .info-icon{
      display: flex;
      align-items: center;
      justify-content: space-around;
      a{
        font-size: 32px;
        color: #bba477;
      }
      .icon-svg{
        width: 32px;
        height: 32px;
      }
    }
  }
  .bar-tag{
    position: relative;
    padding: 0 20px 20px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    .tag-title{
      height: 60px;
      line-height: 60px;
      text-align: center;
      color: #bba477;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 2px;
      position: relative;
      .all-article{
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .tag-list{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .list-box{
        margin: 0 20px 15px 0;
        cursor: pointer;
      }
      .list-active{
        border: 1px dashed rgba(0,0,0,.3);
      }
    }
    .sort-list{
      justify-content: space-around;
      .list-box{
        margin-right: 0;
      }
    }
    .link-list{
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .link-box{
        width: 50%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #333;
        font-size: 16px;
        padding: 0 5px;
        box-sizing: border-box;
        @include overRow;
        &:hover{
          background-color: #f7f7f7;
        }
      }
    }
    .link-empty{
      width: 100%;
      text-align: center;
      letter-spacing: 2px;
      color: #909399;
    }
  }
}
</style>
