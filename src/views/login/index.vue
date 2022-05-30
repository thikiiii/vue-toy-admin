<template>
  <div class="login">
    <div class="login-card">
      <h1 class="login-card-title">Simple Admin</h1>
      <div class="login-card-form">
        <p class="login-card-form-subTitle">登录</p>
        <n-form ref="formRef" :model="form" label-placement="left">
          <n-form-item path="username" required>
            <n-input v-model="form.username" placeholder="请输入用户名">
              <template #prefix>
                <n-icon color="red" size="26px">
                  <icon-carbon-accessibility />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password" required>
            <n-input v-model="form.password" placeholder="请输入密码" show-password-on="mousedown" type="password" />
          </n-form-item>
          <n-form-item>
            <n-row justify-content="space-between">
              <n-col span="8">
                <n-checkbox>自动登录</n-checkbox>
              </n-col>
              <n-col span="4">
                <span class="login-card-form-forgotPassword">忘记密码</span>
              </n-col>
            </n-row>
          </n-form-item>
          <n-form-item>
            <n-button block size="large" type="primary">登录</n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
// import {  } from '@vicons/ionicons5'

const formRef = ref()
const form = reactive({
  username: '',
  password: ''
})
onMounted(() => {
  console.log(formRef.value)
})
</script>


<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: @theme;

  &-card {
    width: 500px;
    height: 560px;
    box-shadow: #0003 0 0 20px;
    border-radius: 5px;
    background: white;
    overflow: hidden;
    transition: .3s;
    background: @backgroundColor;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-title {
      text-align: center;
      padding: 20px;
      font-size: 30px;
      color: @textColor;
    }


    &-form {
      flex: 1;
      margin: 0 auto;
      transition: .3s;
      width: 100%;
      padding: 20px 40px;

      &-subTitle {
        font-size: 22px;
        color: @textColor;
        margin-bottom: 10px;
      }

      &-forgotPassword {
        color: @subTextColor;
        cursor: pointer;
      }
    }
  }
}
</style>