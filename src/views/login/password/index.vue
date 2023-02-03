<script lang="tsx" setup>
  import { reactive, ref } from 'vue';
  import useAuthStore from '@/store/modules/auth';
  import { FormRules, NForm } from 'naive-ui';
  import { useLoginContext } from '@/views/login/useLoginContext';
  import { LoginMethod } from '@/enums/common';

  defineOptions({ name: 'PasswordLogin' });
  const authStore = useAuthStore();
  const { setAction } = useLoginContext();
  const formRef = ref<InstanceType<typeof NForm> | null>();
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
    ]
  })

  // 处理登录
  const handleLogin = () => {
    formRef.value?.validate(async (errors) => {
      if (errors) return;
      await authStore.handleLogin(LoginMethod.Password, form);
    })
  };
</script>

<template>
  <n-form ref="formRef" :model="form" :rules="rules" label-placement="left">
    <n-form-item path="username" required>
      <n-input v-model:value="form.username" placeholder="请输入用户名" size="large" />
    </n-form-item>
    <n-form-item path="password" required>
      <n-input
        v-model:value="form.password"
        placeholder="请输入密码"
        show-password-on="mousedown"
        size="large"
        type="password"
      />
    </n-form-item>
    <n-form-item>
      <n-row key="3" justify-content="space-between">
        <n-col span="6">
          <n-checkbox>记住我</n-checkbox>
        </n-col>
        <n-col span="5">
          <span class="passwordLogin-forgotPassword">忘记密码？</span>
        </n-col>
      </n-row>
    </n-form-item>
    <n-form-item>
      <n-button
        :loading="authStore.loginLoading"
        block
        size="large"
        type="primary"
        @click="handleLogin"
      >
        登录
      </n-button>
    </n-form-item>
    <n-space justify="space-between">
      <n-button block style="width: 120px" @click="setAction('PhoneLogin')">手机登录</n-button>
      <n-button block style="width: 120px" @click="setAction('QrCodeLogin')">二维码登录</n-button>
      <n-button block style="width: 120px" @click="setAction('Registered')">注册</n-button>
    </n-space>
  </n-form>
</template>

<style lang="less" scoped>
  .passwordLogin {
    &-forgotPassword {
      color: @subTextColor;
      cursor: pointer;
    }
  }
</style>
