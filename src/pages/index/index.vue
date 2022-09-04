<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ token }}</text>
      <button @click="changeToken">改变token</button>
    </view>
    <u-button type="primary" text="确定"></u-button>
    <u-tag text="标签" type="success"></u-tag>
    <view> 去除所有空格：{{ $u.trim(str, 'all') }} </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserInfo } from '@/stores/userInfo'
const title = ref('Hello')
const str = ref('a  b c ')

const storeUserInfo = useUserInfo()
console.log(uni.$u.os())
const { token } = storeToRefs(storeUserInfo)
const changeToken = () => {
  token.value = '789456123'
  console.log(storeUserInfo.token)
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
