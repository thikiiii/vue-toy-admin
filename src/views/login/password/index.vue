<script lang="tsx" setup>
import { reactive, ref } from 'vue'
import useAuthStore from '@/store/modules/auth'
import { FormRules, NForm } from 'naive-ui'
import { useLoginContext } from '@/views/login/useLoginContext'
import { LoginMethod } from '@/enums/common'

defineOptions({ name: 'PasswordLogin' })

const authStore = useAuthStore()
const { setAction } = useLoginContext()
const formRef = ref<InstanceType<typeof NForm> | null>()
const form = reactive({
  username: 'admin',
  password: '123456',
})

const rules: FormRules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
})

// 处理登录
const handleLogin = () => {
  formRef.value?.validate(async errors => {
    if (errors) return
    await authStore.handleLogin(LoginMethod.Password, form)
  })
}
</script>

<template>
  <NForm ref="formRef" :model="form" :rules="rules" label-placement="left">
    <NFormItem path="username" required>
      <NInput
        v-model:value="form.username"
        placeholder="请输入用户名"
        size="large"
      />
    </NFormItem>
    <NFormItem path="password" required>
      <NInput
        v-model:value="form.password"
        placeholder="请输入密码"
        show-password-on="mousedown"
        size="large"
        type="password"
      />
    </NFormItem>
    <NFormItem>
      <NRow key="3" justify-content="space-between">
        <NCol span="6">
          <NCheckbox>记住我</NCheckbox>
        </NCol>
        <NCol span="5">
          <span class="passwordLogin-forgotPassword">忘记密码？</span>
        </NCol>
      </NRow>
    </NFormItem>
    <NFormItem>
      <NButton
        :loading="authStore.loginLoading"
        block
        size="large"
        type="primary"
        @click="handleLogin"
      >
        登录
      </NButton>
    </NFormItem>
    <NSpace justify="space-between">
      <NButton block style="width: 120px" @click="setAction('PhoneLogin')"
        >手机登录</NButton
      >
      <NButton block style="width: 120px" @click="setAction('QrCodeLogin')"
        >二维码登录</NButton
      >
      <NButton block style="width: 120px" @click="setAction('Registered')"
        >注册</NButton
      >
    </NSpace>
  </NForm>
</template>

<style lang="less" scoped>
.passwordLogin {
  &-forgotPassword {
    color: @subTextColor;
    cursor: pointer;
  }
}
</style>
