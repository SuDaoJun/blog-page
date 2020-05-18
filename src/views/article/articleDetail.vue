<template>
  <div class="wrapper">
    <header-nav positionValue='relative'></header-nav>
    <div class="article-detail">
      <div class="detail-like">
        <div class="box-like">
          <div :class='isLike?"like-active":""' class="like-icon mio-icon-zan iconfont" @click='likeClick'>
          </div>
          <span :style='{color: isLike?"#ec7259":"#969696"}' @click='likeModalShow'>{{articleDetail.meta.likeTotal}}
            赞</span>
        </div>
        <div class="box-like" @click='viewComment'>
          <div class="like-icon el-icon-chat-dot-round">
          </div>
          <span style='color: #969696'>{{articleDetail.meta.commentTotal}} 评论</span>
        </div>
        <div class="box-like" @click='routeBack'>
          <div class="like-icon el-icon-thumb">
          </div>
          <span style='color: #969696'>返回</span>
        </div>
      </div>
      <div class="detail-content">
        <div class="content-title">
          {{articleDetail.title}}
        </div>
        <div class="content-header">
          <div class="header-info">
            <el-image v-if='articleDetail.createUser'
              :src='baseURL+"/file/down?downId="+articleDetail.createUser.avatarId' class='image-avatar'>
              <div slot="error" class="icon-avatar">
                <i class="el-icon-user-solid"></i>
              </div>
            </el-image>
            <div v-else class="image-avatar">
              <div class="icon-avatar">
                <i class="el-icon-user-solid"></i>
              </div>
            </div>
            <div class="info-data">
              <p>{{articleDetail.createUser?articleDetail.createUser.name:'--'}}</p>
              <div class="data-time">
                <span>{{articleDetail.createTime}}</span>
                <span>字数 {{articleDetail.meta.txtTotal}}</span>
                <span>阅读 {{articleDetail.meta.viewTotal}}</span>
                <span>评论 {{articleDetail.meta.commentTotal}}</span>
                <span>点赞 {{articleDetail.meta.likeTotal}}</span>
              </div>
            </div>
          </div>
          <!-- <div class="header-tag">
             <tag-box :tagList='articleDetail.tags'></tag-box>
           </div> -->
        </div>
        <div class="content-data w-e-text" v-html='articleDetail.content' v-highlight></div>
        <div class="content-message">
          <el-divider>
            <div class="message-title" ref='articleComment'>文章评论</div>
          </el-divider>
          <div class="message-publish">
            <el-image v-if='userInfo && userInfo.avatarId' :src='baseURL+"/file/down?downId="+userInfo.avatarId'
              class='image-avatar'>
              <div slot="error" class="icon-avatar">
                <i class="el-icon-user-solid"></i>
              </div>
            </el-image>
            <div v-else class="image-avatar">
              <div class="icon-avatar">
                <i class="el-icon-user-solid"></i>
              </div>
            </div>
            <div class="publish-textarea">
              <el-input v-model="commentTxt" type='textarea' :rows="3" :autosize='{minRows: 3, maxRows: 6}'
                placeholder="写下你的评论..."></el-input>
              <div class="textarea-submit">
                <el-button round @click.native='commentTxt = ""'>重 置</el-button>
                <el-button type="success" round style='margin-left: 30px;' @click='commentPublish'>发 布</el-button>
              </div>
            </div>
          </div>
          <div class="message-comment" v-if='topCommentList.length > 0'>
            <h3>置顶评论({{topCommentList.length}})</h3>
            <div class="comment-list">
              <div class="list-box" v-for='item in topCommentList' :key='item._id'>
                <el-image v-if='item.createUser' :src='baseURL+"/file/down?downId="+item.createUser.avatarId'
                  class='image-avatar'>
                  <div slot="error" class="icon-avatar">
                    <i class="el-icon-user-solid"></i>
                  </div>
                </el-image>
                <div v-else class="image-avatar">
                  <div class="icon-avatar">
                    <i class="el-icon-user-solid"></i>
                  </div>
                </div>
                <div class="box-item">
                  <div class="item-name">{{item.createUser?item.createUser.name:'--'}}</div>
                  <div class="item-content">{{item.content}}</div>
                  <div class="item-replay">
                    <div class="replay-time">{{item.createTime}}</div>
                    <div class="replay-content" @click='replyComment("sup",item)'>
                      <i class='el-icon-chat-dot-round'></i>
                      回复
                    </div>
                  </div>
                  <div class="item-sub" :style='{height: item.expand?"100%":"0"}' v-show='item.replyCommentList.length > 0'>
                    <div class="list-box" v-for='itemSub in item.replyCommentList' :key='itemSub._id' v-show='itemSub.status == "1"'>
                      <el-image v-if='itemSub.replyUser' :src='baseURL+"/file/down?downId="+itemSub.replyUser.avatarId'
                        class='image-avatar'>
                        <div slot="error" class="icon-avatar">
                          <i class="el-icon-user-solid"></i>
                        </div>
                      </el-image>
                      <div v-else class="image-avatar">
                        <div class="icon-avatar">
                          <i class="el-icon-user-solid"></i>
                        </div>
                      </div>
                      <div class="box-item">
                        <div class="item-name">{{itemSub.replyUser?itemSub.replyUser.name:'--'}}</div>
                        <div class="item-content">
                          <span class='content-replay' v-show='itemSub.toUser && itemSub.replyUser && itemSub.toUser._id !==  itemSub.replyUser._id' >
                            回复 <i style='color: #409EFF'>{{itemSub.toUser?itemSub.toUser.name:'--'}}</i> 的评论：
                          </span>
                          <span>{{itemSub.content}}</span>
                        </div>
                        <div class="item-replay">
                          <div class="replay-time">{{itemSub.createTime}}</div>
                          <div class="replay-content" @click='replyComment("sub",itemSub)'>
                            <i class='el-icon-chat-dot-round'></i>
                            回复
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item-expand" v-show='item.replyCommentList.length > 0' @click='item.expand = !item.expand'>
                    {{item.expand?'收起':'展开'+item.replyCommentNum+'条回复'}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="message-comment">
            <h3>全部评论({{commentList.length}})</h3>
            <div class="comment-list">
              <div class="list-box" v-for='item in commentList' :key='item._id'>
                <el-image v-if='item.createUser' :src='baseURL+"/file/down?downId="+item.createUser.avatarId'
                  class='image-avatar'>
                  <div slot="error" class="icon-avatar">
                    <i class="el-icon-user-solid"></i>
                  </div>
                </el-image>
                <div v-else class="image-avatar">
                  <div class="icon-avatar">
                    <i class="el-icon-user-solid"></i>
                  </div>
                </div>
                <div class="box-item">
                  <div class="item-name">{{item.createUser?item.createUser.name:'--'}}</div>
                  <div class="item-content">{{item.content}}</div>
                  <div class="item-replay">
                    <div class="replay-time">{{item.createTime}}</div>
                    <div class="replay-content" @click='replyComment("sup",item)'>
                      <i class='el-icon-chat-dot-round'></i>
                      回复
                    </div>
                  </div>
                  <div class="item-sub" :style='{height: item.expand?"100%":"0"}' v-show='item.replyCommentList.length > 0'>
                    <div class="list-box" v-for='itemSub in item.replyCommentList' :key='itemSub._id' v-show='itemSub.status == "1"'>
                      <el-image v-if='itemSub.replyUser' :src='baseURL+"/file/down?downId="+itemSub.replyUser.avatarId'
                        class='image-avatar'>
                        <div slot="error" class="icon-avatar">
                          <i class="el-icon-user-solid"></i>
                        </div>
                      </el-image>
                      <div v-else class="image-avatar">
                        <div class="icon-avatar">
                          <i class="el-icon-user-solid"></i>
                        </div>
                      </div>
                      <div class="box-item">
                        <div class="item-name">{{itemSub.replyUser?itemSub.replyUser.name:'--'}}</div>
                        <div class="item-content">
                          <span class='content-replay' v-show='itemSub.toUser && itemSub.replyUser && itemSub.toUser._id !==  itemSub.replyUser._id' >
                            回复 <i style='color: #409EFF'>{{itemSub.toUser?itemSub.toUser.name:'--'}}</i> 的评论：
                          </span>
                          <span>{{itemSub.content}}</span>
                        </div>
                        <div class="item-replay">
                          <div class="replay-time">{{itemSub.createTime}}</div>
                          <div class="replay-content" @click='replyComment("sub",itemSub)'>
                            <i class='el-icon-chat-dot-round'></i>
                            回复
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item-expand" v-show='item.replyCommentList.length > 0' @click='item.expand = !item.expand'>
                    {{item.expand?'收起':'展开'+item.replyCommentNum+'条回复'}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-tocList" v-html='tocList' @click="tocClick">
      </div>
    </div>
    <el-dialog :title="articleDetail.meta.likeTotal + '人点赞'" :visible.sync="likeModal" width='640px'>
      <div>
        <div class="like-dialog" v-for='item in articleDetail.linkUser' :key='item._id'>
          <el-image v-if='item.avatarId' :src='baseURL+"/file/down?downId="+item.avatarId' class='image-avatar'>
            <div slot="error" class="icon-avatar">
              <i class="el-icon-user-solid"></i>
            </div>
          </el-image>
          <div v-else class="image-avatar">
            <div class="icon-avatar">
              <i class="el-icon-user-solid"></i>
            </div>
          </div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import HeaderNav from "@/components/HeaderNav";
import TagBox from "@/components/TagBox";
import { catalogList } from "@/utils/utils";
import "@/assets/css/wangEnduit.css";
export default {
  data() {
    return {
      commentTxt: "",
      isLike: false,
      likeModal: false,
      baseURL: this.$baseURL,
      navShow: true,
      articleId: "",
      articleDetail: {
        meta: {}
      },
      operateId: '',
      tocList: "",
      topCommentList: [],
      commentList: []
    };
  },
  created() {},
  mounted() {
    if (this.$route.query.articleId) {
      this.articleId = this.$route.query.articleId;
      this.getArticleData();
    }
  },
  methods: {
    getArticleData() {
      let { articleId, userInfo } = this;
      this.$api.article
        .articleDetail({
          id: articleId
        })
        .then(res => {
          let code = res.code;
          if (code === this.$constant.reqSuccess) {
            let data = res.data;
            let contentData = catalogList(data.content);
            this.tocList = contentData.tocList;
            data.content = contentData.content;
            this.articleDetail = data;
            if (data.linkUser.length > 0 && userInfo) {
              for (let i = 0; i < data.linkUser.length; i++) {
                if (data.linkUser[i]._id == userInfo.id) {
                  this.isLike = true;
                  break;
                } else {
                  this.isLike = false;
                }
              }
            } else {
              this.isLike = false;
            }
            this.getCommentList();
          } else {
            this.$message.warning("获取文章详情失败");
          }
        });
    },
    // 获取评论列表
    getCommentList() {
      let { articleId } = this;
      this.$api.article
        .articleCommentList({
          articleId,
          currentPage: "1",
          pageSize: "999",
          status: "1",
          sortBy: "createTime",
          sortOrders: "-1"
        })
        .then(res => {
          console.log(res);
          let data = res.data.data;
          let topArr = [];
          if (data.length > 0) {
            data.forEach(item => {
              if(item._id == this.operateId){
                item.expand = true
              }else{
                item.expand = false
              }
              if (item.isTop) {
                topArr.push(item);
              }
            });
          }
          this.topCommentList = topArr.length > 0?JSON.parse(JSON.stringify(topArr)):topArr;
          this.commentList = data;
        });
    },
    // 返回上一个路由
    routeBack(){
      this.$router.back(-1)
    },
    // 点赞弹框用户列表
    likeModalShow() {
      if (this.articleDetail.meta.likeTotal > 0) {
        this.likeModal = true;
      }
    },
    // 文章点赞
    likeClick() {
      let { articleDetail, articleId, isLike, userInfo } = this;
      if (sessionStorage.getItem("token")) {
        this.$api.article
          .articleLike({
            id: articleId,
            type: isLike ? "0" : "1"
          })
          .then(res => {
            let code = res.code;
            if (code === this.$constant.reqSuccess) {
              if (this.isLike) {
                articleDetail.meta.likeTotal -= 1;
                articleDetail.linkUser = articleDetail.linkUser.filter(item => {
                  item._id != userInfo.id;
                });
              } else {
                articleDetail.meta.likeTotal += 1;
                articleDetail.linkUser.push({
                  avatarId: userInfo.avatarId,
                  _id: userInfo.id,
                  name: userInfo.name
                });
              }
              this.isLike = !this.isLike;
            }
          });
      } else {
        this.$store.dispatch("operateLoginModal");
        this.$message.warning("登录才能点赞，请先登录");
      }
    },
    // 文章评论发布
    commentPublish() {
      let { articleId, commentTxt } = this;
      if (sessionStorage.getItem("token")) {
        if (commentTxt) {
          this.$api.article
            .articleComment({
              articleId,
              content: commentTxt
            })
            .then(res => {
              let code = res.code;
              if (code === this.$constant.reqSuccess) {
                this.commentTxt = "";
                this.getArticleData();
              }
            });
        } else {
          this.$message.warning("评论内容不为空");
        }
      } else {
        this.$store.dispatch("operateLoginModal");
        this.$message.warning("登录才能评论，请先登录");
      }
    },
    // 回复评论
    replyComment(type,item){
      let { articleId } = this
      if (sessionStorage.getItem("token")) {
        this.operateId = type === 'sup'?item._id:item.commentId
        this.$prompt(`回复 @${type === 'sup'?item.createUser.name:item.replyUser.name}：`, '回复评论', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'textarea',
          inputPlaceholder: '回复评论',
          inputValidator: (val)=>{ 
            if (val === null || val === '') {
              return false
            }
          },
          inputErrorMessage: '评论内容不为空'
        }).then(({ value }) => {
          this.$api.article.replyCommentAdd({
            commentId: type === 'sup'?item._id:item.commentId,
            toUser: type === 'sup'?item.createUser._id:item.replyUser._id,
            content: value
          }).then((res)=>{
            console.log(res)
            let code = res.code
            if(code === this.$constant.reqSuccess){
              this.getArticleData()
            }else{
              this.$message.warning('评论回复失败')
            }
          })
        }).catch(() => {      
        })
      } else {
        this.$store.dispatch("operateLoginModal");
        this.$message.warning("登录才能回复评论，请先登录");
      }
    },
    // 右侧导航点击
    tocClick(e) {
      console.log(e);
      let id = e.target.id;
      if (id) {
        document.querySelector(`#${id}`).scrollIntoView({
          behavior: "smooth"
        });
      }
    },
    viewComment() {
      this.$refs.articleComment.scrollIntoView({
        behavior: "smooth"
      });
    }
  },
  watch: {
    userInfo: {
      // 这里不能使用箭头函数，不然this指向就不是vue组件里面的this了
      handler: function(val) {
        this.getArticleData();
      },
      deep: true
    }
  },
  components: {
    HeaderNav,
    TagBox
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
.article-detail {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  display: flex;
  .detail-content {
    flex: 1;
    background-color: #fff;
    padding: 30px;
    .content-title {
      color: #333;
      font-size: 34px;
      font-weight: 600;
      text-align: center;
    }
    .content-header {
      margin-bottom: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .header-info {
        display: flex;
        .info-data {
          margin-left: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          & > p {
            font-size: 16px;
          }
          .data-time {
            color: #969696;
            span {
              margin-right: 10px;
            }
          }
        }
      }
      .header-tag {
        display: flex;
        align-items: center;
      }
    }
    .content-message {
      margin-top: 60px;
      .message-title {
        color: #8a9aa9;
        font-size: 16px;
        text-align: center;
      }
      .message-publish {
        margin-top: 40px;
        display: flex;
        .publish-textarea {
          margin-left: 20px;
          flex: 1;
          /deep/ textarea {
            background: #fafafa;
          }
          .textarea-submit {
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }
        }
      }
      .message-comment {
        & > h3 {
          height: 20px;
          line-height: 20px;
          border-left: 4px solid #ec7259;
          padding-left: 12px;
          margin: 40px 0 10px;
          font-size: 18px;
        }
        .comment-list {
          .list-box {
            display: flex;
            &:first-child{
              padding-top: 30px;
            }
            .box-item {
              height: 100%;
              flex: 1;
              margin-left: 10px;
              margin-bottom: 30px;
              border-bottom: 1px solid #f1f1f1;
              .item-content {
                margin-top: 12px;
              }
              .item-replay {
                margin: 20px 0;
                color: #8a9aa9;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .replay-content {
                  cursor: pointer;
                }
              }
              .item-sub{
                padding: 0 10px;
                margin-bottom: 10px;
                background-color: #fafbfc;
                border-radius: 4px;
                overflow: hidden;
                transition: all 0.4s ease;
              }
              .item-expand{
                color: #8a9aa9;
                padding-left: 10px;
                margin-bottom: 10px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .detail-like {
    height: 100%;
    margin-right: 30px;
    margin-top: 230px;
    position: sticky;
    top: 230px;
    .box-like {
      margin-bottom: 30px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .like-icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #fff;
        color: #969696;
        margin-bottom: 8px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .like-active {
        background-color: #ec7259;
        color: #fff;
      }
    }
  }
  /deep/ .detail-tocList {
    width: 300px;
    height: 100%;
    margin-left: 30px;
    margin-top: 230px;
    position: sticky;
    padding-bottom: 24px;
    top: 230px;
    .catalog-title {
      color: #909090;
      margin-bottom: 6px;
      font-size: 16px;
    }
    .catalog-link {
      font-size: 16px;
      line-height: 24px;
      color: #909090;
      @include overRow;
      cursor: pointer;
      padding-left: 20px;
      position: relative;
      &:hover {
        color: #1890ff;
      }
      &::before {
        content: "\E78B";
        font-family: "element-icons";
        position: absolute;
        font-size: 12px;
        left: 4px;
        top: 0;
      }
    }
  }
}
.like-dialog {
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  // &:not(:last-child){
  //   border-bottom: 1px solid #eee;
  // }
  p {
    margin-left: 8px;
    font-size: 18px;
  }
}
.image-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /deep/ .icon-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #c0c4cc;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-icon-user-solid {
      font-size: 26px;
      color: #fff;
    }
  }
}
/deep/ .w-e-text{
  overflow: hidden;
  .rich-title{
    span{
      font-weight: 600;
    }
  }
}
</style>