<template>
  <div :class="isTransparent?'header-nav header-transparent':'header-nav'" :style='{position: positionValue}'>
    <div class="nav-content">
      <div class="content-nav">
        <el-menu :default-active="activeIndex" class="nav-menu" mode="horizontal" @select="handleSelect">
          <el-menu-item :index="item.routeName" v-for="item in menuList" :key='item.routeName'>
            <div class="menu-item">
              <i :class='item.icon'></i>
              <span>{{item.name}}</span>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content-info" v-if='userInfo'>
        <el-image @click='routhHome' v-if='userInfo.avatarId' :src='baseURL+"/blogAdmin/file/down?downId="+userInfo.avatarId'
          class='image-circle'>
          <div slot="error" class="image-slot">
            <i class="el-icon-user-solid"></i>
          </div>
        </el-image>
        <div v-else class="image-slot">
          <i class="el-icon-user-solid"></i>
        </div>
        <el-tooltip effect="dark" :content="userInfo.info || 'hello'" placement="bottom">
          <span class='link-name'>{{userInfo.name || '--'}}</span>
        </el-tooltip>
        <el-button type="danger" size="small" @click.native='logout'>退 出</el-button>
      </div>
      <div class="content-login" v-else>
        <el-button type="primary" size="medium" @click.native='loginDialog'>登 录</el-button>
        <el-button type="success" size="medium" @click.native='registerDialog' style='margin-left: 40px;'>注 册
        </el-button>
      </div>
    </div>
    <el-dialog title="账号登录" :visible.sync="loginModal" width='640px' @keyup.enter.native="userLogin"
      :modal-append-to-body='false'>
      <div class="login-dialog">
        <my-form :ref='loginForm.ref' :formConfig="loginForm"></my-form>
        <el-button type="primary" style='width: 100%;' :loading="submitLoad"  @click.native="userLogin">登 录</el-button>
        <el-button type="success" style='width: 100%;margin-top: 20px;' @click.native="goRegister">去 注 册</el-button>
      </div>
    </el-dialog>
    <el-dialog title="账号注册" :visible.sync="registerModal" width='640px' @keyup.enter.native="userRegister"
      :modal-append-to-body='false'>
      <div class="login-dialog">
        <my-form :ref='registerForm.ref' :formConfig="registerForm"></my-form>
        <el-button type="primary" style='width: 100%;' :loading="submitLoad"  @click.native="userRegister">注 册</el-button>
        <el-button type="success" style='width: 100%;margin-top: 20px;' @click.native="comeBackLogin">返 回 登 录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyForm from "@/components/MyForm";
import Format from "@/utils/format.js";
import { baseURL } from "@/utils/index.js";
export default {
  props: {
    positionValue: {
      type: String,
      default: 'fixed'
    },
    isTransparent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validatePwdCheck = (rule, value, callback) => {
      if (value === "" || value === undefined) {
        callback(new Error("请输入确认密码"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("确认密码字符长度为6-16个字符"));
      } else if (value != this.registerForm.formModel.password) {
        callback(new Error("确认密码和密码不一致"));
      } else {
        callback();
      }
    };
    return {
      baseURL: baseURL,
      activeIndex: "article",
      submitLoad: false,
      menuList: [
        {
          name: "文章",
          routeName: "article",
          icon: "el-icon-document"
        },
        {
          name: "归档",
          routeName: "archive",
          icon: "mio-icon-guidang iconfont"
        },
        {
          name: "项目",
          routeName: "project",
          icon: "el-icon-tickets"
        },
        {
          name: "留言",
          routeName: "message",
          icon: "el-icon-edit-outline"
        }
      ],
      loginForm: {
        ref: "loginRef",
        marginBottom: "40px",
        formItemList: [
          {
            type: "text",
            prop: "name",
            placeholder: "用户名或邮箱"
          },
          {
            type: "password",
            prop: "password",
            placeholder: "密码"
          }
        ],
        formModel: {
          name: "",
          password: ""
        },
        rules: {
          name: [
            {
              required: true,
              validator: Format.FormValidate.Form("用户名或邮箱").NoEmpty,
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              validator: Format.FormValidate.Form("密码").Password,
              trigger: "blur"
            }
          ]
        }
      },
      userInfo: null,
      registerModal: false,
      registerForm: {
        ref: "registerRef",
        marginBottom: "40px",
        formItemList: [
          {
            type: "text",
            prop: "name",
            placeholder: "用户名"
          },
          {
            type: "password",
            prop: "password",
            placeholder: "密码"
          },
          {
            type: "password",
            prop: "confirPwd",
            placeholder: "确认密码"
          },
          {
            type: "text",
            prop: "email",
            placeholder: "邮箱"
          },
          {
            type: "text",
            prop: "phone",
            placeholder: "手机号码(选填)"
          }
        ],
        formModel: {
          name: "",
          password: "",
          confirPwd: "",
          email: "",
          phone: ""
        },
        rules: {
          name: [
            {
              required: true,
              validator: Format.FormValidate.Form("用户名").NoEmpty,
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              validator: Format.FormValidate.Form("密码").Password,
              trigger: "blur"
            }
          ],
          confirPwd: [
            { required: true, validator: validatePwdCheck, trigger: "blur" }
          ],
          email: [
            {
              required: true,
              validator: Format.FormValidate.Form("邮箱").Email,
              trigger: "blur"
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.getNavCurrent(this.$route.name)
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : null;
  },
  methods: {
    loginDialog() {
      if (this.$refs["loginRef"]) {
        this.$refs["loginRef"].$refs["loginRef"].resetFields();
      }
      this.$store.commit('changeLoginModal')
    },
    registerDialog() {
      if (this.$refs["registerRef"]) {
        this.$refs["registerRef"].$refs["registerRef"].resetFields();
      }
      this.registerModal = true;
    },
    goRegister(){
      this.$store.commit('changeLoginModal')
      this.registerDialog()
    },
    comeBackLogin(){
      this.registerModal = false
      this.loginDialog()
    },
    logout() {
      this.userInfo = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userInfo");
      this.$store.commit('changeUserInfo', null)
    },
    userRegister() {
      let formModel = this.registerForm.formModel;
      this.$refs["registerRef"].$refs["registerRef"].validate(valid => {
        if (valid) {
          this.submitLoad = true
          this.$api.user
            .register({
              email: formModel.email,
              name: formModel.name,
              phone: formModel.phone,
              password: formModel.password,
              type: 'pageUser'
            })
            .then(res => {
              this.submitLoad = false
              let code = res.code;
              if (code === this.$constant.reqSuccess) {
                this.$message.success("账号注册成功，请登录")
                this.registerModal = false
              } else if (code === this.$constant.dataAlready) {
                this.$message.warning("该用户名已存在")
                formModel.name = ""
              } else if (code === this.$constant.statusFail) {
                this.$message.warning("该邮箱已存在")
                formModel.email = ""
              } else {
                this.$message.warning("账号注册失败")
              }
            });
        } else {
          this.$message.warning("信息校验失败");
        }
      });
    },
    userLogin() {
      let formModel = this.loginForm.formModel;
      this.$refs["loginRef"].$refs["loginRef"].validate(valid => {
        if (valid) {
          this.submitLoad = true
          this.$api.user
            .login({
              name: formModel.name,
              password: formModel.password
            })
            .then(res => {
              this.submitLoad = false
              let code = res.code;
              if (code === this.$constant.reqSuccess) {
                this.userInfo = res.data.user;
                this.$store.commit('changeLoginModal')
                sessionStorage.setItem("token", "Bearer " + res.data.token);
                sessionStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.user)
                )
                this.$store.commit('changeUserInfo', res.data.user)
              } else if (code === this.$constant.dataFail) {
                this.$message.warning("邮箱或用户名不存在");
                this.loginForm.formModel.name = "";
              } else if (code === this.$constant.statusFail) {
                this.$message.warning(
                  "该用户处于禁用状态，请联系管理员启用该账号"
                );
              } else if (code === this.$constant.pwdFail) {
                this.$message.warning("密码错误");
                this.loginForm.formModel.password = "";
              } else {
                this.$message.warning("登录失败");
              }
            });
        } else {
          this.$message.warning("信息校验失败");
        }
      });
    },
    // 获取当前高亮导航
    getNavCurrent(name){
      if(name === 'articleDetail'){
        name = 'article'
      }
      this.activeIndex = name
    },
    routhHome(){
      this.$router.push({path: '/article'})
    },
    //  菜单点击
    handleSelect(index,indexPath) {
      this.activeIndex = index
      if(index === 'article'){
        this.$router.push({path: '/article'})
      }else if(index === 'archive'){
        this.$router.push({path: '/article/archive'})
      }else if(index === 'project'){
        this.$router.push({path: '/project'})
      }else if(index === 'message'){
        this.$router.push({path: '/message'})
      }
    }
  },
  components: {
    MyForm
  },
  watch: {
    $route(route) {
      this.getNavCurrent(route.name)
    }
  },
  computed: {
    loginModal:{
      get(){
        return this.$store.state.loginModal
      },
      set(val){
        this.$store.commit('changeLoginModal')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-nav {
  width: 100vw;
  background-color: #fff;
  left: 0;
  top: 0;
  z-index: 1000;
  .nav-content {
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    border-bottom: 1px solid rgb(238, 238, 238);
    display: flex;
    align-items: center;
    justify-content: space-between;
    /deep/ .content-nav {
      .el-menu-item {
        margin-right: 20px;
        .iconfont{
          margin-right: 5px;
          width: 24px;
          text-align: center;
          font-size: 18px;
          vertical-align: middle;
          display: inline-block;
        }
        &:hover i {
          color: #303133;
        }
      }
    }
    .content-login {
      display: flex;
      align-items: center;
    }
    .content-info {
      display: flex;
      align-items: center;
      span {
        margin-left: 12px;
        margin-right: 15px;
        font-size: 18px;
        letter-spacing: 1px;
        cursor: pointer;
      }
    }
  }
}
.login-dialog {
  padding: 0 20px;
}
.el-button+.el-button{
  margin-left: 0;
}
.header-transparent{
  background-color: transparent;
  /deep/ .el-menu.el-menu--horizontal{
    border-bottom: none;
    background-color: transparent;
    .el-menu-item{
      &.is-active{
        border-bottom: none;
      }
      &:hover, &:focus{
        background-color: transparent;
      }
    }
  }
}
</style>
