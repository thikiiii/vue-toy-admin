<script lang="ts" setup>

import { request } from '@/services/request'
import { wrapperEnv } from '@/utils'

console.log(wrapperEnv())
const test = async () => {
    const {} = await request.get <any, { name: null }>('/cs/cs1')
}
</script>

<template>
    <main class="main">
        <n-button @click="test">请求</n-button>
    </main>
</template>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    padding: 0 20px;
}
</style>