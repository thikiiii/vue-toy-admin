<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { useRouteStore } from '@/store/modules/route'

const route = useRoute()
const routeStore = useRouteStore()

const breadcrumb = ref<Store.MenuOption[]>([])


watch(() => route.path, (path) => {
  breadcrumb.value = routeStore.getBreadcrumb(path)
  console.log(breadcrumb.value)
})

</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="menu in breadcrumb" :key="menu.key">{{ menu.meta.title }}</n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style scoped>

</style>