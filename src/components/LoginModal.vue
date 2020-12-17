<template>
  <view class="login-modal">
    <u-popup mode="center" width='85%' v-model="show" :closeable='true' :mask-close-able='false' border-radius='16'>
      <view class="modal-login" v-show="type == 'login'">
        <view class="login-title">账号登录</view>
        <u-form :model="loginForm" ref="uLoginForm" label-width='110' :errorType="errorType">
          <u-form-item label="用户名" prop="name"><u-input v-model="loginForm.name" placeholder="用户名或邮箱" /></u-form-item>
          <u-form-item label="密码" prop="password"><u-input v-model="loginForm.password" :password-icon="true"  type="password" placeholder="密码" /></u-form-item>
        </u-form>
        <u-button type="primary" :custom-style="customStyle" @click='loginUser' :loading='loginLoading' :disabled='loginLoading' shape='circle'>登录</u-button>
        <u-button type="success" shape='circle' @click='toRegister'>注册</u-button>
      </view>
      <view class="modal-login" v-show="type == 'register'">
        <view class="login-title">账号注册</view>
      </view>
    </u-popup>
  </view>
</template>

<script>

export default {
  props: {

  },
  data: () => ({
    show: true,
    type: 'login',
    customStyle: {
      marginBottom: '20rpx',
      marginTop: '30rpx',
    },
    loginLoading: false,
    errorType: ['message', 'border-bottom'],
    loginForm: {
      name: '',
      password: ''
    },
    loginRules: {
      name: {
        required: true,
        message: '请输入用户名或邮箱',
        trigger: 'blur' 
      },
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
        {
          required: true,
          min: 5,
          max: 16,
          message: '密码字符长度为6-16个字符',
          trigger: 'blur',
        }
      ],
    }
  }),
  computed: {},
  methods: {
    loginUser(){
      this.$refs.uLoginForm.validate(valid => {
        if (valid) {

        } else {

        }
      });
    },
    toRegister(){
      this.type = 'register';
    }
  },
  watch: {

  },

  // 组件周期函数--监听组件挂载完毕
  mounted() {
    setTimeout(()=>{
      this.$refs.uLoginForm.setRules(this.loginRules);
    },1000)
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
.modal-login{
  padding: 26rpx 30rpx 30rpx 30rpx;
  .login-title{
    text-align: center;
    color: #333;
    font-weight: 600;
    font-size: 32rpx;
    letter-spacing: 2rpx;
    margin-bottom: 30rpx;
  }
}
</style>

