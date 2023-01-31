<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import PasswordLogin from './password/index.vue'
import QrCodeLogin from '@/views/login/qrCode/index.vue'
import { useLoginContext } from '@/views/login/useLoginContext'
import { computed } from 'vue'

const layoutStore = useLayoutStore()
const { mobile } = layoutStore

const { currentAction } = useLoginContext()

const title = computed(() => {
    switch (currentAction.value) {
        case 'PasswordLogin':
            return '登录'
        case 'PhoneLogin':
            return '手机号登录'
        case 'QrCodeLogin':
            return '验证码登录'
        case 'Registered':
            return '注册登录'
        default:
            return '登录'
    }
})

// 其他登录方式
const otherLoginMethods = [
    {
        icon: 'mdi:github',
        title: 'Github'
    },
    {
        icon: 'mdi:wechat',
        title: '微信'
    },
    {
        icon: 'ant-design:alipay-circle-filled',
        title: '支付宝'
    },
    {
        icon: 'ant-design:google-circle-filled',
        title: '谷歌'
    },
    {
        icon: 'mdi:twitter-circle',
        title: '推特'
    }
]

</script>

<template>
  <div class="login">
    <div v-if="!mobile.isMobile" class="login-frontCover">
      <div class="login-frontCover-svg">
        <icon color="red" local-icon="login" size="100%"/>
      </div>
    </div>
    <side-fade-animation position="bottom" offset="20px">
      <div class="test"></div>
    </side-fade-animation>
    <div class="login-card">
      <side-fade-animation :start-offset="['-20px','-20px']" :end-offset="[0,0]" appear >
        <h1 class="login-card-title">Toy Admin</h1>
      </side-fade-animation>
      <div class="login-card-form">
        <div class="login-card-form-title">{{ title }}</div>
        <password-login v-if="currentAction==='PasswordLogin'"/>
        <qr-code-login v-if="currentAction==='QrCodeLogin'"/>
        <n-divider title-placement="center">
          其他登录方式
        </n-divider>
        <n-space justify="space-around">
          <n-popover placement="bottom" v-for="item in otherLoginMethods" :key="item.icon" :delay="300" trigger="hover">
            <template #trigger>
              <icon class="login-card-form-icon" size="22" pointer :icon="item.icon"></icon>
            </template>
            <span>{{ item.title }}</span>
          </n-popover>
        </n-space>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background: @theme;

  &-frontCover {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;

    &-svg {
      width: 60%;
      height: 60%;
    }
  }

  &-card {
    width: 50vw;
    flex: 1;
    height: 100%;
    background: @subBackgroundColor;
    padding: 2vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

    &-title {
      text-align: center;
      font-size: 40px;
      position: absolute;
      top: 50px;
      color: @theme;
      background-image: -webkit-linear-gradient(0deg, @theme, #aa7fff);
      -webkit-background-clip: text;
      text-fill-color: transparent;
      -webkit-text-fill-color: transparent;
    }

    &-form {
      width: 400px;

      &-title {
        text-align: left;
        font-size: 30px;
        margin-bottom: 10px;
        font-weight: 500;
        color: @mainTextColor;
      }

      &-icon {
        color: @subTextColor;
      }
    }
  }


}
</style>
