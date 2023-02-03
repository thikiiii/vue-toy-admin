<template>
  <n-menu
    ref="menuRef"
    :default-value="route.path"
    :indent="30"
    :root-indent="24"
    :value="activeMenu"
    @update:value="selectMenu"
  />
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { computed, ref, watch } from 'vue'
  import { MenuInst, MenuProps } from 'naive-ui'
  import { useRouteStore } from '@/store/modules/route'

  type Props = MenuProps

  defineOptions({ name: 'Menu' })
  defineProps<Props>()
  const route = useRoute()
  const routeStore = useRouteStore()
  const menuRef = ref<MenuInst | null>(null)

  // 激活菜单
  const activeMenu = computed(() => route.path)

  const selectMenu = (key: string) => {
    routeStore.handleClickMenu(key)
  }

  watch(activeMenu, (newActiveMenu) => {
    // 监听路由改变后，展开激活项
    menuRef.value?.showOption(newActiveMenu)
  })
</script>

<style lang="less" scoped></style>
