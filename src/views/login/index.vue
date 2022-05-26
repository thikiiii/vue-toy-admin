<template>
  <div class="h-full relative bg-white overflow-hidden">
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'


const route = useRoute()
console.log(route.query.redirect)
</script>

<style scoped>

</style>