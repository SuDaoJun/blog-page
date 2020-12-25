<template>
  <view class="info-data">
    <nav-header :isBack='true' title='个人信息'></nav-header>
    <view class="show-data">
      <u-cell-group>
        <u-cell-item title="头像" @click='avatarChange'>
          <u-image error-icon='photo'  slot="right-icon" width="85rpx" height="85rpx" :border-radius='8' :src='baseURL+"/blogAdmin/file/down?downId="+infoData.avatarId'></u-image>
        </u-cell-item>
        <u-cell-item title="用户名" :arrow='false' @click='inputFocus.name = true'>
          <view slot='right-icon' class='data-input'>
            <u-field
              v-model="infoData.name"
              input-align='right'
              :border-bottom='false'
              :error-message='errorMessage.name'
              :focus='inputFocus.name'
              maxlength='16'
              @input="inputChange('name')"
              @blur='inputFocus.name = false'
              placeholder="请填写用户名"
            >
            </u-field>
          </view>
        </u-cell-item>
        <u-cell-item title="邮箱" :arrow='false' @click='inputFocus.email = true'>
          <view slot='right-icon' class='data-input'>
            <u-field
              v-model="infoData.email"
              input-align='right'
              :border-bottom='false'
              :error-message='errorMessage.email'
              :focus='inputFocus.email'
              maxlength='50'
              @input="inputChange('email')"
              @blur='inputFocus.email = false'
              placeholder="请填写邮箱"
            >
            </u-field>
          </view>
        </u-cell-item>
        <u-cell-item title="个性签名" :arrow='false' @click='inputFocus.info = true'>
          <view slot='right-icon' class='data-input'>
            <u-field
              v-model="infoData.info"
              input-align='right'
              :border-bottom='false'
              :focus='inputFocus.info'
              maxlength='50'
              @blur='inputFocus.info = false'
              placeholder="请填写个性签名（选填）"
            >
            </u-field>
          </view>
        </u-cell-item>
        <u-cell-item title="修改密码" @click='pwdModalShow'></u-cell-item>
      </u-cell-group>
    </view>
    
    <view class="show-btn u-p-l-40 u-p-r-40 u-m-t-60">
      <u-button type="primary" hover-class='none' @click='saveMessage' :loading='btnLoading' :disabled='btnLoading' :custom-style="customStyle" shape='circle'>保存信息</u-button>
    </view>
    <login-modal :modelShow='modelShow' @closeModal='closeModal'></login-modal>
    <!-- 修改密码 -->
    <u-popup mode="center" width='85%' v-model="psdShow" :closeable='true' :mask-close-able='false' border-radius='16'
       @close='pwdPopupClose' @open='pwdPopupOpen'>
      <view class="modal-login">
        <view class="login-title">修改密码</view>
        <u-form :model="pwdForm" ref="upwdForm" label-width='130' :errorType="errorType">
          <u-form-item label="旧密码" prop="oldPwd">
            <u-input maxlength='16' v-model="pwdForm.oldPwd" :password-icon="true" type="password"
              placeholder="旧密码" />
          </u-form-item>
          <u-form-item label="新密码" prop="newPwd">
            <u-input maxlength='16' v-model="pwdForm.newPwd" :password-icon="true" type="password"
              placeholder="新密码" />
          </u-form-item>
          <u-form-item label="确认密码" prop="confirPwd">
            <u-input maxlength='16' v-model="pwdForm.confirPwd" :password-icon="true" type="password"
              placeholder="确认密码" />
          </u-form-item>
        </u-form>
        <u-button type="primary" :custom-style="pwdCustomStyle" @click='modifyPwd' :loading='pwdLoading'
          :disabled='pwdLoading' shape='circle'>确认</u-button>
        <u-button shape='circle' @click="psdShow = false">取消</u-button>
      </view>
    </u-popup>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import { baseURL } from '@/utils'
import LoginModal from '@/components/LoginModal'
export default {
  components: {
    LoginModal
  },
  data(){
    return {
      baseURL,
      modelShow: false,
      btnLoading: false,
      infoData: {},
      customStyle: {
        background: 'linear-gradient(270deg, #1BA2E8, #36EAE8)'
      },
      errorMessage: {
        name: '',
        email: '',
      },
      inputFocus: {
        name: false,
        email: false,
        info: false,
      },
      psdShow: false,
      pwdLoading: false,
      pwdForm: {
        oldPwd: '',
        newPwd: '',
        confirPwd: ''
      },
      errorType: ["message", "border-bottom"],
      pwdCustomStyle: {
        marginBottom: "20rpx",
        marginTop: "30rpx",
      },
      pwdRules: {
        oldPwd: [
          {
            required: true,
            message: "请输入旧密码",
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
        newPwd: [
          {
            required: true,
            message: "请输入新密码",
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
              return value === this.pwdForm.newPwd;
            },
            message: '两次输入的密码不相等',
            trigger: 'blur',
          }
        ]
      },
    }
  },
  computed: {},
  methods: {
    // 头像上传
    avatarChange(){
      uni.chooseImage({
          success: (chooseImageRes) => {
              const tempFilePaths = chooseImageRes.tempFilePaths;
              const uploadTask = uni.uploadFile({
                  url: `${baseURL}/blogAdmin/file/upload`,
                  filePath: tempFilePaths[0],
                  name: 'file',
                  header: {
                    Authorization: "Bearer "+this.vuex_token
                  },
                  formData: {},
                  success: (uploadFileRes) => {
                    let data = JSON.parse(uploadFileRes.data);
                    this.infoData.avatarId = data.data.sourceId;
                  }
              });
          }
      });
    },
    // 输入框校验
    inputChange(type){
      let {infoData, errorMessage} = this;
      if(type === 'name'){
        errorMessage.name = infoData.name?'':'请输入用户名';
      }else if(type === 'email'){
        if(infoData.email){
          if(this.$u.test.email(infoData.email)){
            errorMessage.email = '';
          }else{
            errorMessage.email = '邮箱格式不正确';
          }
        }else{
          errorMessage.email = '请输入邮箱';
        }
      }
    },
    // 登录弹框关闭
    closeModal(){
      this.modelShow = false;
      if(this.vuex_userInfo.id){
        this.infoData = this.$u.deepClone(this.vuex_userInfo);
      }
    },
    pwdModalShow(){
      if(this.vuex_userInfo.id){
        this.psdShow = true;
      }else{
        this.modelShow = true;
      }
    },
    pwdPopupOpen(){
      this.$refs.upwdForm.setRules(this.pwdRules);
    },
    pwdPopupClose(){
      // #ifdef MP-WEIXIN
      this.pwdForm = {
        oldPwd: '',
        newPwd: '',
        confirPwd: ''
      }
      // #endif
      this.$refs.upwdForm.resetFields();
    },
    // 修改密码
    modifyPwd(){
      this.$refs.upwdForm.validate((valid) => {
        if(valid){
          this.pwdLoading = true;
          let pwdForm = this.pwdForm;
          this.$u.api.user.userPwdModify({
            password: pwdForm.oldPwd,
            newPassword: pwdForm.newPwd
          }).then(res=>{
            this.$refs.uToast.show({
              title: '密码修改成功，请重新登录',
              type: 'success'
            })
            uni.setStorageSync("loginStatus", '0');
            this.$store.commit('$storeLife', {
              name: 'vuex_token',
              value: ''
            })
            this.$store.commit('$storeLife', {
              name: 'vuex_userInfo',
              value: {}
            })
            this.pwdLoading = false;
            this.psdShow = false;
            this.modelShow = true;
          }).catch((res)=>{
            this.pwdLoading = false;
            if(res.statusCode == 403){
              this.modelShow = true;
            }
          })
        }
      })
      
    },
    // 更新信息
    saveMessage(){
      let {errorMessage, infoData} = this;
      if(this.vuex_userInfo.id){
        if(!errorMessage.name && !errorMessage.email && infoData.name && infoData.email){
          this.btnLoading = true;
          this.$u.api.user.userUpdate({
            avatarId: infoData.avatarId,
            name: infoData.name,
            email: infoData.email,
            info: infoData.info || null,
          }).then(res=>{
            this.$refs.uToast.show({
              title: '信息更新成功',
              type: 'success'
            })
            this.btnLoading = false;
            this.vuex_userInfo.avatarId = infoData.avatarId;
            this.vuex_userInfo.name = infoData.name;
            this.vuex_userInfo.email = infoData.email;
            if(infoData.info){
              this.vuex_userInfo.info = infoData.info;
            }
            if(uni.getStorageSync("rememberObj")){
              let rememberObj = uni.getStorageSync("rememberObj");
              rememberObj.name = infoData.name;
              uni.setStorageSync("rememberObj", rememberObj);
            }
            this.$u.vuex('vuex_userInfo', this.vuex_userInfo);
          }).catch((res)=>{
            this.btnLoading = false;
            if(res.statusCode == 403){
              this.modelShow = true;
            }
          })
        }else{
          this.$u.toast('请完善信息');
        }
      }else{
        this.modelShow = true;
      }
    }
  },
  watch: {},

  // 页面周期函数--监听页面加载
  onLoad() {
    this.infoData = this.$u.deepClone(this.vuex_userInfo);
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {
    
  },
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    uni.stopPullDownRefresh();
  },
  // 页面处理函数--监听用户上拉触底
  onReachBottom() {},
  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss" scoped>
/deep/ .data-input{
  .u-error-message{
    text-align: right;
    margin-right: 16rpx;
    margin-top: 8rpx;
  }
}
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
