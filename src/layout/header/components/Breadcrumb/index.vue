<script lang="ts" setup>
import { RouteLocationMatched, useRoute, useRouter } from 'vue-router'
import { onMounted, ref, watch } from 'vue'

defineOptions({ name: 'Breadcrumb' })

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
  <n-breadcrumb class="inverted">
    <n-breadcrumb-item v-for="menu in breadcrumb" :key="menu.key">
      <n-dropdown :options="menu.children" :value="route.path" @select="onSelect">
        <span>
          {{ menu.label }}
        </span>
      </n-dropdown>
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<style lang="less" scoped>
.inverted {
  :deep(.n-breadcrumb-item:last-child .n-breadcrumb-item__link) {
    color: @invertTextColor;
  }

  :deep( .n-breadcrumb-item .n-breadcrumb-item__link) {
    color: #a0aec0;
  }

  :deep( .n-breadcrumb-item .n-breadcrumb-item__separator) {
    color: #a0aec0;
  }
}

</style>