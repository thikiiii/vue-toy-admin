<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { useRouteStore } from '@/store/modules/route'

const route = useRoute()
const routeStore = useRouteStore()
const router = useRouter()
const breadcrumb = ref<Store.MenuOption[]>([])

const onSelect = (path) => {
  router.push(path)
}

onMounted(() => {
  breadcrumb.value = routeStore.getBreadcrumb(route.path)
})

// 监听路由变化
watch(() => route.path, (path) => {
  breadcrumb.value = routeStore.getBreadcrumb(path)
})
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="menu in breadcrumb" :key="menu.key">
      <n-dropdown :options="menu.children" :value="route.path" @select="onSelect">
        <span>
          <icon v-if="menu.meta?.icon" :icon="menu.meta?.icon"></icon>
          {{ menu.meta?.title }}
        </span>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
