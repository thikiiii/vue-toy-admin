<script lang="ts" setup>

import { request } from '@/services/request'

console.log(request)
</script>

<template>
    <main class="main">
        <n-button @click="request">请求</n-button>
    </main>
</template>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    padding: 0 20px;
}
</style>