<script lang="ts" setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <div>
        about
        <p>{{ count }}</p>
        <button @click="count++">测试</button>
    </div>
</template>

<style scoped>

</style>