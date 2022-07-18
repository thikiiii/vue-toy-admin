<script lang="ts" setup>
import { inject, reactive, Ref, ref } from 'vue'
import { QrCode } from '@/views/login/index'
import useAuthStore from '@/store/modules/auth'
import { FormRules, NForm } from 'naive-ui'

const authStore = useAuthStore()
const formRef = ref<InstanceType<typeof NForm> | null>()
const form = reactive({
    username: 'admin',
    password: '123456'
})
const rules: FormRules = reactive({
    username: [
        {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
        }
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
        }
    ]
})
const loginType = inject('loginType') as Ref<typeof QrCode>

// 设置登录类型
const setLoginType = (component: typeof QrCode) => loginType.value = component

// 处理登录
const handleLogin = () => {
    formRef.value?.validate(async (errors) => {
        if (errors) return
        authStore.loginLoading = true
        await authStore.passwordLogin(form)
    })
}
</script>

<template>
    <div class="passwordLogin">
        <h1 class="passwordLogin-title">登录</h1>
        <n-form ref="formRef" :model="form" :rules="rules" label-placement="left">
            <transition-group appear name="right-slide-fade">
                <n-form-item key="1" path="username" required>
                    <n-input v-model:value="form.username" placeholder="请输入用户名" size="large">
                        <template #prefix>
                            <icon icon="account" />
                        </template>
                    </n-input>
                </n-form-item>
                <n-form-item key="2" path="password" required style="transition-delay: .1s">
                    <n-input
                        v-model:value="form.password" placeholder="请输入密码" show-password-on="mousedown"
                        size="large"
                        type="password">
                        <template #prefix>
                            <icon icon="lock" />
                        </template>
                    </n-input>
                </n-form-item>
                <n-form-item key="3" style="transition-delay: .25s">
                    <n-row key="3" justify-content="space-between" style="transition-delay: .25s">
                        <n-col span="5">
                            <n-checkbox>记住我</n-checkbox>
                        </n-col>
                        <n-col span="5">
                            <span class="passwordLogin-forgotPassword">忘记密码？</span>
                        </n-col>
                    </n-row>
                </n-form-item>
                <n-form-item key="4" style="transition-delay: .4s">
                    <n-button :loading="authStore.loginLoading" block size="large" type="primary" @click="handleLogin">
                        登录
                    </n-button>
                </n-form-item>
                <n-space key="5" justify="space-evenly" style="transition-delay: .55s">
                    <n-button size="large">手机登录</n-button>
                    <n-button size="large" @click="setLoginType(QrCode)">二维码登录</n-button>
                    <n-button size="large">注册</n-button>
                </n-space>
            </transition-group>
        </n-form>
    </div>
</template>

<style lang="less" scoped>
.passwordLogin {
    width: 400px;
    height: auto;
    
    &-title {
        font-size: 30px;
        color: @mainTextColor;
        margin-bottom: 10px;
    }
    
    &-forgotPassword {
        color: @subTextColor;
        cursor: pointer;
    }
}
</style>