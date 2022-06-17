<script lang="ts" setup>
import { inject } from 'vue'

const size = inject<string>('size')
</script>

<template>
    <icon :size="size" icon="github"></icon>
</template>

<style scoped>

</style>