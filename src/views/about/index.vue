<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'About'
})
const count = ref(0)
</script>

<template>
  <div>
    <n-button type="primary">Caswe</n-button>
    about
    <p v-for="item in 100" :key="item">{{ count }}</p>
    <button @click="count++">测试</button>
  </div>
</template>

<style scoped>

</style>