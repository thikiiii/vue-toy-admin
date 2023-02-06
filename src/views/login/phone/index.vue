<script lang="ts" setup>
import { useLoginContext } from '@/views/login/useLoginContext'

defineOptions({ name: 'PhoneLogin' })
const loginContext = useLoginContext()
</script>

<template>
  <n-form ref="formRef" label-placement="left">
    <n-form-item path="username" required>
      <n-input placeholder="请输入手机号" size="large" />
    </n-form-item>
    <n-form-item path="password" required>
      <n-input placeholder="请输入验证码" size="large" />
      <n-button style="margin-left: 10px" size="large"> 发送验证码 </n-button>
    </n-form-item>
    <n-form-item>
      <n-button block size="large" type="primary"> 登录 </n-button>
    </n-form-item>
    <n-form-item>
      <n-button
        block
        size="large"
        @click="loginContext.setAction('PasswordLogin')"
      >
        返回
      </n-button>
    </n-form-item>
  </n-form>
</template>

<style scoped></style>
