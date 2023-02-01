<script lang="ts" setup>
import { useLoginContext } from '@/views/login/useLoginContext'

defineOptions({ name: 'QrCodeLogin' })
const { setAction } = useLoginContext()
</script>

<template>
  <n-space align="center" vertical>
    <img alt="" height="250" src="src/assets/images/login-qrCode.png" width="250">
    <p class="qrCodeLogin-prompt">扫码点击“确定”，即可完成登录</p>
    <n-button block style="width: 250px;" @click="setAction('PasswordLogin')">返回</n-button>
  </n-space>
</template>

<style lang="less" scoped>
.qrCodeLogin{
  width: 100%;
  display: flex;
  &-prompt{
    color: @mainTextColor;
  }
}
</style>
