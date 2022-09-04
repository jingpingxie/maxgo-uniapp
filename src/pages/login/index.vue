<template>
  <view id="storeReg" style="background: url('../../static/img/login-bg.png')">
    <view class="login-box">
      <view class="login-img-box">
        <image class="login-logo" src="../../static/img/login-logo.png" mode="widthFix"></image>
        <!-- <image class="login-title" src="../../static/img/login-title.png" mode="widthFix"></image> -->
      </view>
      <view class="input-frame">
        <input
          v-model="usernameOrPhone"
          type="text"
          placeholder="请输入登录账号"
          class="account-input"
          @focus="showClear(1, true)"
          @blur="showClear(1, false)"
        />
        <image
          v-show="clearStatus1"
          src="../../static/img/close.png"
          mode="widthFix"
          class="clear-content"
          @tap="clearContent(1)"
        ></image>
      </view>
      <view class="input-frame">
        <input
          v-model="password"
          type="password"
          placeholder="请输入登录密码"
          class="account-input"
          @focus="showClear(2, true)"
          @blur="showClear(2, false)"
        />
        <image
          v-show="clearStatus2"
          src="../../static/img/close.png"
          mode="widthFix"
          class="clear-content"
          @tap="clearContent(2)"
        ></image>
      </view>
      <view class="go-psw-box">
        <checkbox-group class="go-edit-psw" name="" @change="checkChange">
          <checkbox :checked="checked" style="transform: scale(0.6)" />
          <view style="margin-top: 8rpx">记住密码</view>
        </checkbox-group>
        <view class="go-edit-psw" @tap="goResetPsw"> 忘记密码？ </view>
      </view>
      <button class="bind_button" size="large" type="button" @click="bind">登 录</button>
      <view class="go-reg-box">
        <text> 还没有账号？ </text>
        <text class="go-reg" @tap="goReg"> 立即注册> </text>
      </view>
    </view>
    <!-- <view class="login-bottom"> 江西百胜智能科技股份有限公司 </view> -->
  </view>
</template>
<script lang="ts" setup>
import { ILogin, ILoginParams } from '@/models/login'
import { useUserInfo } from '@/stores/userInfo'
import { ref } from 'vue'
import { signIn } from '@/api/login'
import { login } from '@/utils/login'

let checked = ref(false)

const checkChange = () => {
  checked.value = !checked.value
}

let clearStatus1 = ref(false)
let clearStatus2 = ref(false)
const showClear = (status, state) => {
  state = state ? true : false

  setTimeout(function () {
    if (status === 1) {
      clearStatus1.value = state
    } else {
      clearStatus2.value = state
    }

    //验证
  }, 100)
}

let usernameOrPhone = ref('')
let password = ref('')
const clearContent = (type) => {
  if (type === 1) {
    usernameOrPhone.value = ''
  } else {
    password.value = ''
  }
}
const goReg = () => {
  uni.navigateTo({
    url: '/pages/common/regCheck',
  })
}
const goResetPsw = () => {
  uni.navigateTo({
    url: '/pages/common/resetPswCheck',
  })
}
const bind = () => {
  // let loginOb = new login()
  // loginOb
  //   .doLogin(usernameOrPhone.value, password.value)
  //   .then((result: any) => {
  //     goHome()
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
}
const goHome = () => {
  uni.navigateTo({
    url: '/pages/index/index',
  })
}
</script>

<style lang="scss" scoped>
.go-psw-box {
  margin-top: 20upx;
  display: flex;
  justify-content: space-between;

  .go-edit-psw {
    color: #335ff2;
    display: flex;
  }
}

.go-reg-box {
  text {
    color: #00071e;
  }

  margin-top: 25upx;
  text-align: center;

  .go-reg {
    color: #335ff2;
  }
}

#storeReg {
  float: left;
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: 100% 100vh;
  background-position: center;
}

.input-frame {
  width: 100%;
  height: 90upx;
  background: #f7f7f7;
  border-radius: 40upx;
  position: relative;
  margin-top: 36upx;
}

.input-frame img,
.input-frame image {
  z-index: 1;
}

.input-frame:nth-child(2) {
  margin-top: 36upx;
}

.login-account {
  float: left;
  width: 30upx;
  height: 50upx;
  margin-top: 20upx;
  margin-left: 26upx;
}

.account-input {
  float: left;
  height: 90upx;
  width: calc(100% - 100upx);
  line-height: 90upx;
  margin-left: 30upx;
  font-size: 30upx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #999;
  text-align: left;
}

.clear-content {
  width: 40upx;
  height: 40upx;
  position: absolute !important;
  top: 25upx;
  right: 25upx;
  z-index: 9999999 !important;
  filter: drop-shadow(705px 0 0 #000);
}

.login-pass {
  float: left;
  width: 36upx;
  height: 42upx;
  margin-top: 24upx;
  margin-left: 26upx;
}

.bind_button {
  border-radius: 40upx;
  height: 90upx;
  line-height: 90upx;
  font-size: 36upx;
  text-align: center;
  background: linear-gradient(269deg, #1c48d7, #3965f9);
  box-shadow: 2px 3px 16px 0px rgba(0, 60, 255, 0.4);
  outline: none;
  -webkit-appearance: none;
  margin-top: 50upx;
}

.uni-input-placeholder {
  font-size: 30upx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ccc;
}

.login-img-box {
  position: absolute;
  top: -250upx;
  left: 0upx;
  width: 640upx;
}

.login-box {
  background: #fff;
  padding: 300upx 40upx 80upx;
  text-align: center;
  margin: 0 auto;
  position: relative;
  border-radius: 60upx;
  color: #cccccc;
  width: 640upx;
  margin-top: 350upx;
  z-index: 1;

  .login-logo {
    width: 500upx !important;
  }

  .login-title {
    width: 400upx !important;
    margin-top: 60upx;
  }
}

.login-bottom {
  text-align: center;
  color: #fff;
  position: fixed;
  bottom: 50upx;
  width: 100%;
}
</style>
