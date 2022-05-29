<template>
  <div class="login">
    <div class="login-container">
      <div class="login-frontCover" />
      <div class="login-form">
        <n-button type="primary" @click="test">test</n-button>
        <n-checkbox v-model:checked="value">
          复选框
        </n-checkbox>
        <n-checkbox v-model:checked="value" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store/modules/theme'
import { ref } from 'vue'

const value = ref()
const themeStore = useThemeStore()
const test = () => {
  themeStore.toggleTheme()
}
</script>


<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: @theme;

  .login-container {
    height: 560px;
    box-shadow: #0003 0 0 20px;
    border-radius: 5px;
    background: white;
    display: flex;
    overflow: hidden;
    transition: .3s;

    .login-frontCover, .login-form {
      flex: 1;
      padding: 20px;
      transition: .3s;
    }

    .login-frontCover {
      background: #f2f5fa;
    }

    .login-form {
    }
  }
}

@media (min-width: 1000px) {
  .login-container {
    width: 1000px;
  }
}

@media (max-width: 1000px) {
  .login-container {
    width: 500px;

    .login-frontCover {
      display: none;
    }
  }
}
</style>