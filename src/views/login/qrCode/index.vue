<script lang="ts" setup>
import { useLoginContext } from '@/views/login/useLoginContext'
defineOptions({ name: 'QrCodeLogin' })
const { setAction } = useLoginContext()
</script>

<template>
  <n-space vertical align="center">
    <img width="250" height="250" src="src/assets/images/login-qrCode.png" alt="">
    <p>扫码点击“确定”，即可完成登录</p>
    <n-button @click="setAction('PasswordLogin')" style="width: 250px;" block>返回</n-button>
  </n-space>
</template>

<style lang="less" scoped>
.qrCodeLogin{
  width: 100%;
  display: flex;
}
</style>
