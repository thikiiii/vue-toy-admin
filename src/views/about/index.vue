<script lang="ts" setup>
import { ref } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({
  name: 'About'
})
const count = ref(0)
const layoutStore = useLayoutStore()
</script>

<template>
  <div>
    <n-button type="primary" @click="layoutStore.isFixedFooter=!layoutStore.isFixedFooter">测试</n-button>
    about
    <p v-for="item in 100">{{ count }}</p>
    <button @click="count++">测试</button>
  </div>
</template>

<style scoped>

</style>