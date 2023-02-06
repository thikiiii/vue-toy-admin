<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import PasswordLogin from './password/index.vue'
import QrCodeLogin from '@/views/login/qrCode/index.vue'
import PhoneLogin from '@/views/login/phone/index.vue'
import { useLoginContext } from '@/views/login/useLoginContext'
import { computed } from 'vue'
import { SchemaFormOption } from '@/components/common/SchemaForm/index.vue'

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

const option: SchemaFormOption[] = [
    {
        type: 'input',
        label: '测试',
        field: 'test',
        props: {}
    }
]

const model = { test: 11 }

</script>

<template>
  <div class="login">
    <div v-if="!mobile.isMobile" class="login-frontCover">
      <img
          class="login-frontCover-img"
          src="../../assets/images/login-coverPicture.png"
      >
      <n-card>
        <schema-form :model="model" :option="option" />
      </n-card>
    </div>
    <div class="login-card">
      <div class="login-card-header">
        <img alt="" src="../../assets/images/logo.png">
        <h1>Toy Admin</h1>
      </div>
      <div class="login-card-form">
        <div class="login-card-form-title">{{ title }}</div>
        <transition mode="out-in" name="zoom-fade">
          <password-login v-if="currentAction === 'PasswordLogin'" />
          <qr-code-login v-else-if="currentAction === 'QrCodeLogin'" />
          <phone-login v-else-if="currentAction === 'PhoneLogin'" />
        </transition>
        <n-divider title-placement="center"> 其他登录方式</n-divider>
        <n-space justify="space-around">
          <n-popover
              v-for="item in otherLoginMethods"
              :key="item.icon"
              :delay="300"
              placement="bottom"
              trigger="hover"
          >
            <template #trigger>
              <icon
                  :icon="item.icon"
                  class="login-card-form-icon"
                  pointer
                  size="22"
              />
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

    &-img {
      width: 90%;
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

    &-header {
      display: flex;
      align-items: center;
      flex-direction: column;
      position: absolute;
      top: 30px;

      h1 {
        font-size: 40px;
        color: @theme;
        background-image: -webkit-linear-gradient(0deg, @theme, #aa7fff);
        -webkit-background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
      }

      img {
        height: 100px;
      }
    }

    &-form {
      width: 400px;

      &-title {
        text-align: left;
        font-size: 28px;
        margin-bottom: 20px;
        font-weight: bold;
        color: @mainTextColor;
        display: inline-block;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          height: 5px;
          background: @theme;
          width: 80%;
          left: 50%;
          bottom: -5px;
          border-radius: 2px;
          transform: translateX(-50%);
        }
      }

      &-icon {
        color: @subTextColor;
      }
    }
  }
}
</style>
