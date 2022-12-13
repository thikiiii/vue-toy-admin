<script lang="ts" setup>
import Password from '@/views/login/password/index.vue'
import {provide, shallowRef} from 'vue'
import {useLayoutStore} from "@/store/modules/layout";

const layoutStore = useLayoutStore();
const {mobile} = layoutStore
const loginType = shallowRef(Password)

provide('loginType', loginType)
</script>

<template>
  <div class="login">
    <div v-if="!mobile.isMobile" class="login-bg">
      <transition appear name="right-slide-fade">
        <div class="login-bg-svg">
          <icon color="red" local-icon="login" size="100%"/>
        </div>
      </transition>
    </div>
    <div class="login-card">
      <transition appear name="right-slide-fade">
        <h1 class="login-card-title">Toy Admin</h1>
      </transition>
      <div class="login-card-form">
        <component :is="loginType"/>
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

  &-bg {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;

    &-svg {
      width: 50%;
      height: 100%;
    }
  }

  &-card {
    width: 50vw;
    flex: 1;
    height: 100%;
    overflow: hidden;
    transition: .3s;
    background: @subBackgroundColor;
    padding: 20px 40px;
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
      height: auto;

      &-title {
        width: 100%;
        text-align: left;
        font-size: 30px;
        margin-bottom: 10px;
        font-weight: 500;
        color: @mainTextColor;
      }
    }
  }
}
</style>