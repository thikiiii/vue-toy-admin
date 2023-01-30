<script lang="ts" setup>
import { ref } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'About' })
const count = ref(0)
const layoutStore = useLayoutStore()
</script>

<template>
    <div>
        <n-button @click="layoutStore.sidebar.sidebarWidth = 500" type="primary">Caswe</n-button>
        about
        <p v-for="item in 100" :key="item">{{ count }}</p>
        <button @click="count++">测试</button>
    </div>
</template>

<style scoped></style>
