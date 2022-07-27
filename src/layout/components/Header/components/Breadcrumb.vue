<script lang="ts" setup>
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

interface Breadcrumb {
  key: string
  label: string
  children?: Breadcrumb[]
}

const route = useRoute()
const router = useRouter()
const breadcrumb = ref<Breadcrumb[]>([])

const onSelect = (path) => {
  router.push(path)
}

const RouteMatchedToBreadcrumb = (routeMatched: RouteLocationMatched[]): Breadcrumb[] => routeMatched.map(item => {
  return {
    key: item.path,
    label: item.meta.title,
    children: Array.isArray(item.children) ? RouteMatchedToBreadcrumb(item.children as RouteLocationMatched[]) : undefined
  }
})


onMounted(() => {
  breadcrumb.value = RouteMatchedToBreadcrumb(route.matched).filter(item => item.key !== '/')
})

// 监听路由变化
watch(() => route.path, () => {
  breadcrumb.value = RouteMatchedToBreadcrumb(route.matched).filter(item => item.key !== '/')
})
</script>

<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="menu in breadcrumb" :key="menu.key">
      <n-dropdown :options="menu.children" :value="route.path" @select="onSelect">
        <span>
          {{ menu.label }}
        </span>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>
