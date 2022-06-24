<script lang="ts" setup>
import { Component, inject, Ref } from 'vue'
import { Password } from '@/views/login/index'

const loginType = inject('loginType') as Ref<Component>
const set = () => {
    loginType.value = Password
}
</script>

<template>
    <p @click="set">二维码</p>
</template>

<style scoped>

</style>