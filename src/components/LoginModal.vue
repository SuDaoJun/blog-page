<template>
  <view class="login-modal">
    <u-toast ref="uToast" />
    <u-popup mode="center" width='85%' v-model="show" :closeable='true' :mask-close-able='false' border-radius='16'
      @open='popupOpen' @close='popupClose'>
      <view class="modal-login" v-show="type == 'login'">
        <view class="login-title">账号登录</view>
        <u-form :model="loginForm" ref="uLoginForm" label-width='130' :errorType="errorType">
          <u-form-item label="用户名" prop="name">
            <u-input maxlength='16' v-model="loginForm.name" placeholder="用户名或邮箱" />
          </u-form-item>
          <u-form-item label="密码" prop="password">
            <u-input maxlength='16' v-model="loginForm.password" :password-icon="true" type="password"
              placeholder="密码" />
          </u-form-item>
          <u-form-item label="记住密码">
            <u-switch slot="right" size='40' active-color='#4cd964' v-model="remeberVal"></u-switch>
          </u-form-item>
        </u-form>
        <u-button type="primary" :custom-style="customStyle" @click='loginUser' :loading='loginLoading'
          :disabled='loginLoading' shape='circle'>登录</u-button>
        <u-button type="success" shape='circle' @click="type = 'register'">注册</u-button>
      </view>
      <view class="modal-login" v-show="type == 'register'">
        <view class="login-title">账号注册</view>
        <u-form :model="registerForm" ref="uRegisterForm" label-width='130' :errorType="errorType">
          <u-form-item label="用户名" prop="name">
            <u-input maxlength='16' v-model="registerForm.name" placeholder="用户名或邮箱" />
          </u-form-item>
          <u-form-item label="密码" prop="password">
            <u-input maxlength='16' v-model="registerForm.password" :password-icon="true" type="password"
              placeholder="密码" />
          </u-form-item>
          <u-form-item label="确认密码" prop="confirPwd">
            <u-input maxlength='16' v-model="registerForm.confirPwd" :password-icon="true" type="password"
              placeholder="确认密码" />
          </u-form-item>
          <u-form-item label="邮箱" prop="email">
            <u-input maxlength='50' v-model="registerForm.email" placeholder="邮箱" />
          </u-form-item>
        </u-form>
        <u-button type="primary" :custom-style="customStyle" @click='registerUser' :loading='loginLoading'
          :disabled='loginLoading' shape='circle'>注册</u-button>
        <u-button type="success" shape='circle' @click="type = 'login'">返回登录</u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  props: {
    modelShow: {
      type: Boolean,
      default: false,
    },
  },
  data(){
    return {
      show: false,
      type: "login",
      customStyle: {
        marginBottom: "20rpx",
        marginTop: "30rpx",
      },
      loginLoading: false,
      remeberVal: true,
      errorType: ["message", "border-bottom"],
      loginForm: {
        name: "",
        password: "",
      },
      loginRules: {
        name: {
          required: true,
          message: "请输入用户名或邮箱",
          trigger: "blur",
        },
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            min: 5,
            max: 16,
            message: "密码字符长度为6-16个字符",
            trigger: "blur",
          },
        ],
      },
      registerForm: {
        name: "",
        password: "",
        confirPwd: "",
        email: "",
      },
      registerRules: {
        name: {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
          {
            required: true,
            min: 5,
            max: 16,
            message: "密码字符长度为6-16个字符",
            trigger: "blur",
          }
        ],
        confirPwd: [
          {
            required: true,
            message: '请重新输入密码',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback)=>{
              return value === this.registerForm.password;
            },
            message: '两次输入的密码不相等',
            trigger: 'blur',
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
          {
            validator: (rule, value, callback) => {
              return this.$u.test.email(value);
            },
            message: '邮箱格式不正确',
            trigger: 'blur',
          }
        ]
      },
    }
  },
  computed: {},
  methods: {
    loginUser() {
      this.$refs.uLoginForm.validate((valid) => {
        if (valid) {
          let { name, password } = this.loginForm;
          this.loginLoading = true;
          this.$u.api.user
            .userLogin({
              name,
              password,
            })
            .then((res) => {
              this.loginLoading = false;
              let data = res.data;
              this.$u.vuex('vuex_token', data.token);
              this.$u.vuex('vuex_userInfo', data.user);
              let rememberObj = {
                remeberVal: this.remeberVal,
                name,
                pwd: password,
              };
              uni.setStorageSync("rememberObj", rememberObj);
              uni.setStorageSync("loginStatus", '1');
              this.show = false;
            })
            .catch(() => {
              this.loginLoading = false;
            });
        }
      });
    },
    registerUser(){
      this.$refs.uRegisterForm.validate((valid) => {
        if (valid) {
          let { name, password, email} = this.registerForm;
          this.loginLoading = true;
          this.$u.api.user
            .userRegister({
              email,
              name,
              password,
              type: 'pageUser'
            })
            .then((res) => {
              this.loginLoading = false;
              this.$refs.uToast.show({
                title: '注册成功',
                type: 'success'
              })
              this.loginForm = {
                name,
                password
              };
              this.type = 'login';
              this.$refs.uRegisterForm.resetFields();
            })
            .catch(() => {
              this.loginLoading = false;
            });
        }
      });
    },
    popupOpen() {
      this.$refs.uLoginForm.setRules(this.loginRules);
      this.$refs.uRegisterForm.setRules(this.registerRules);
      this.type = "login";
      if (uni.getStorageSync("rememberObj")) {
        let rememberObj = uni.getStorageSync("rememberObj");
        this.remeberVal = rememberObj.remeberVal;
        if (rememberObj.remeberVal) {
          this.loginForm = {
            name: rememberObj.name,
            password: rememberObj.pwd,
          };
        }
      }
    },
    popupClose() {
      this.$emit("closeModal", "");
      // #ifdef MP-WEIXIN
      this.loginForm = {
        name: "",
        password: ""
      }
      this.registerForm = {
        name: "",
        password: "",
        confirPwd: "",
        email: ""
      }
      // #endif
      this.$refs.uLoginForm.resetFields();
      this.$refs.uRegisterForm.resetFields();
    },
  },
  watch: {
    modelShow(val) {
      if (val) {
        this.show = val;
      }
    },
  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    if (uni.getStorageSync("rememberObj")) {
      let rememberObj = uni.getStorageSync("rememberObj");
      this.remeberVal = rememberObj.remeberVal;
      if (rememberObj.remeberVal) {
        this.loginForm = {
          name: rememberObj.name,
          password: rememberObj.pwd,
        };
      }
    }
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
.modal-login {
  padding: 26rpx 30rpx 30rpx 30rpx;
  .login-title {
    text-align: center;
    color: #333;
    font-weight: 600;
    font-size: 32rpx;
    letter-spacing: 2rpx;
    margin-bottom: 30rpx;
  }
}
</style>

