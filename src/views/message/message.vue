<template>
  <div class="wrapper-message">
     <header-nav :isTransparent='true'></header-nav>
     <div class="message-box">
       <div class="box-header" @click='addMessage'></div>
       <div class="box-refresh el-icon-refresh" :class="{'refresh-active': refreshLoading}" @click='refreshMessage'></div>
       <div class="box-item" v-for='item in messageList' :key='item._id' :style="item.style" @mousedown.prevent="mousedown">
         <div class="item-header" :style="{backgroundImage: `url(${require(`../../assets/img/note${item.bg}_1.png`)})`}">{{item.createTime.split(' ')[0]}}</div>
         <div class="item-body" :style="{backgroundImage: `url(${require(`../../assets/img/note${item.bg}_2.png`)})`}">{{item.content}}</div>
         <div class="item-footer" :style="{backgroundImage: `url(${require(`../../assets/img/note${item.bg}_3.png`)})`}">
             <el-image v-if='item.createUser'
               :src='baseURL+"/blogAdmin/file/down?downId="+item.createUser[0].avatarId' class='image-avatar'>
               <div slot="error" class="icon-avatar">
                 <i class="el-icon-user-solid"></i>
               </div>
             </el-image>
             <div v-else class="image-avatar">
               <div class="icon-avatar">
                 <i class="el-icon-user-solid"></i>
               </div>
             </div>
             <p>{{item.createUser?item.createUser[0].name:'--'}}</p>
         </div>
       </div>
     </div>
     <raindrop-canvas v-if="showRaindropCanvas" @close="showRaindropCanvas=false"></raindrop-canvas>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import RaindropCanvas from '@/components/RaindropCanvas/RaindropCanvas'
import { randNumber } from '@/utils/utils'
export default {
  data() {
    return {
      baseURL: this.$baseURL,
      refreshLoading: false,
      messageList: [],
      isDrag: false,
      dragObj: null,
      dragMouseOffset: {
          x: 0,
          y: 0
      },
      screen: {
        width: 0,
        height: 0
      },
      showRaindropCanvas: false,
      // 最大拖拽距离
      maxDragOffset: {},
      // 拖拽元素层级
      noteIndex: 5,
      // 最大拖拽距离
      crashOffset: {
          w: 0,
          h: 0
      }
    }
  },
  created() {

  },
  mounted() {
    let doc = document.documentElement || document.body
    this.screen = {
      width: doc.clientWidth,
      height: doc.clientHeight
    }
    this.crashOffset = {
        x: doc.clientWidth - 235,
        y: doc.clientHeight - 235
    }
    this.getMessages()
  },
  methods: {
    // 获取随机留言
    getMessages(){
      return new Promise((resolve, reject) => {
        this.$api.statistics.randomMessage({
          num: 10
        }).then(res=>{
          console.log(res)
          let data = res.data
          if(data.length > 0){
            data = data.map(item => this.formatStyleByMessage(item))
          }
          this.messageList = data
          resolve()
        })
      })
    },
    // 新增留言
    addMessage(){
      if (sessionStorage.getItem("token")) {
        this.$prompt(``, '发表留言', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputType: 'textarea',
          inputPlaceholder: '留言内容',
          inputValidator: (val)=>{ 
            if (val === null || val === '') {
              return false
            }
          },
          inputErrorMessage: '留言内容不为空',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '提交中...';
              let value = instance.$refs.input.value
              this.$api.message.messageAdd({
                content: value
              }).then((res)=>{
                console.log(res)
                let code = res.code
                if(code === this.$constant.reqSuccess){
                  let data = this.formatStyleByMessage(res.data)
                  this.messageList.push(data)
                  instance.confirmButtonLoading = false;
                  done();
                }else{
                  this.$message.warning('留言失败')
                }
              })
            } else {
              done();
            }
          }
        })
        .then(({ value }) => {
          
        }).catch(() => {      
        })
      } else {
        this.$store.dispatch("operateLoginModal");
        this.$message.warning("登录才能留言，请先登录");
      }
    },
    // 添加样式
    formatStyleByMessage(item) {
        item.style = {
            left: `${randNumber(0, this.crashOffset.x)}px`,
            top: `${randNumber(60, this.crashOffset.y)}px`
        }
        item.bg = randNumber(1, 6)
        return item
    },
    // 刷新随机留言
    async refreshMessage(){
      if (this.refreshLoading) {
        return
      }
      this.refreshLoading = true
      await this.getMessages()
      this.refreshLoading = false
    },
    // 拖拽留言，按下鼠标左键时间
    mousedown (e) {
      this.isDrag = true
      this.dragObj = e.currentTarget
      this.dragMouseOffset = this.getCurrentOffset(e)
      this.maxDragOffset = this.getMaxDragOffset(e)
      this.LiftingZIndex()
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    // 鼠标距离元素的位置
    getCurrentOffset (e) {
      let target = e.target
      let offset = {
          x: 0, 
          y: 0
      }
      while (target.className.indexOf('box-item') < 0) {
          offset = {
              x: offset.x + target.offsetLeft + target.clientLeft,
              y: offset.y + target.offsetTop + target.clientTop
          }
          target = target.offsetParent
      }
      offset = {
          x: e.offsetX + offset.x,
          y: e.offsetY + offset.y + 60,
      }
      return offset
    },
    // 获取
    getMaxDragOffset (e) {
        const target = e.currentTarget
        let w = target.offsetWidth,
            h = target.offsetHeight
        return {
            w: this.screen.width - w,
            h: this.screen.height - h - 60
        }
    },
    // 当前元素提升层级
    LiftingZIndex () {
        this.noteIndex += 1
        this.dragObj.style.zIndex = this.noteIndex
    },
    mousemove (e) {
        if (!this.isDrag) return
        let {x, y} = this.getCurrentEleCoords(e)
        let {w, h} = this.maxDragOffset
        if (x < 0) x = 0
        if (x > w) x = w
        if (y < 0) y = 0
        if (y > h) y = h
        this.dragObj.style.left = `${x}px`
        this.dragObj.style.top = `${y}px`
        if(y <= 0){
          this.showRaindropCanvas = true
        }
    },
    // 鼠标当前距离
    getCurrentEleCoords(e){ 
        return {
            x: e.clientX - this.dragMouseOffset.x,
            y: e.clientY - this.dragMouseOffset.y
        }
    },
    mouseup () {
      this.isDrag = false
    }
  },
  watch: {

  },
  components: {
    HeaderNav,
    RaindropCanvas
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.wrapper-message{
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
  overflow: hidden;
  background-image: url('../../assets/img/wall.png');
  user-select: none;
  .message-box{
    width: 100%;
    height: 100%;
    position: relative;
    .box-header{
      width: 250px;
      height: 80px;
      background: url('../../assets/img/message.png') no-repeat;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      z-index: 999;
      cursor: pointer;
    }
    .box-refresh{
      padding: 10px;
      color: #c1866a;
      position: absolute;
      right: 40px;
      top: 10px;
      font-size: 50px;
      font-weight: 600;
      z-index: 999;
      cursor: pointer;
      &.refresh-active {
        animation: rotate360 2s linear infinite;
      }
      @keyframes rotate360 {
          100% {
              transform: rotate(360deg)
          }
      }
    }
    .box-item{
      width: 235px;
      max-height: 235px;
      position: absolute;
      z-index: 5;
      cursor: move;
      .item-header{
        width: 235px;
        height: 68px;
        padding: 45px 30px 0px 30px;
        font-family: Georgia;
        color: #999;
        font-size: 18px;
      }
      .item-body{
        width: 235px;
        line-height: 20px;
        padding: 0 15px 0 30px;
        word-wrap: break-word;
        background-position: -2px;
        color: #6f5a5a;
        @include mulOverRow(3);
      }
      .item-footer{
        width: 235px;
        height: 72px;
        padding: 20px 20px 10px 30px;
        display: flex;
        align-items: center;
        .image-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          /deep/ .icon-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #c0c4cc;
            display: flex;
            align-items: center;
            justify-content: center;
            .el-icon-user-solid {
              font-size: 16px;
              color: #fff;
            }
          }
        }
        p{
          margin-left: 5px;
          color: #333;
          flex: 1;
          @include overRow;
        }
      }
    }
  }
}
</style>