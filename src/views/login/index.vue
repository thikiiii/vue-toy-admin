<script lang="ts" setup>
import { Password } from '@/views/login/index'
import { onBeforeUnmount, onMounted, provide, ref, shallowRef } from 'vue'

const isMobile = ref(true)
const loginType = shallowRef(Password)

provide('loginType', loginType)

const resize = () => {
    isMobile.value = document.body.offsetWidth <= 1000
}

onMounted(() => {
    resize()
    window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
})
</script>

<template>
    <div class="login">
        <div v-if="!isMobile" class="login-bg">
            <transition appear name="right-slide-fade">
                <img alt="" src="../../assets/svg/login.svg">
            </transition>
        </div>
        <div class="login-card">
            <theme-switch class="login-card-theme" />
            <transition appear name="right-slide-fade">
                <h1 class="login-card-title">Thik Admin</h1>
            </transition>
            <div class="login-card-form">
                <component :is="loginType" />
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
        
        img {
            height: 50%;
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
        
        
        &-theme {
            position: absolute;
            right: 15px;
            top: 15px;
        }
    }
}
</style>