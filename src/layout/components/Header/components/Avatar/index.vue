<script lang="ts" setup>
import useAuthStore from '@/store/modules/auth'
import router from '@/router'
import { useRouteStore } from '@/store/modules/route'

defineOptions({ name: 'Avatar' })

const authStore = useAuthStore()
const routeStore = useRouteStore()
const option = [
  {
    label: '个人中心',
    key: 'user'
  },
  {
    label: '退出登录',
    key: 'signOut'
  }
]
const onSelect = (key) => {
  switch (key) {
    case 'user':
      break
    case 'signOut':
      authStore.signOut().finally(() => {
        router.push({
          path: '/login',
          query: {
            redirect: router.currentRoute.value.path
          }
        })
        authStore.initUserStore()
        routeStore.initRouteStore()
        window.$message?.success('退出登录成功!')
      })
  }
}
</script>

<template>
  <n-dropdown :options="option" trigger="hover" @select="onSelect">
    <div class="avatar">
      <n-avatar
          :src="authStore.userinfo?.avatar"
          round
          size="medium"
      />
      {{ authStore.userinfo?.username }}
    </div>
  </n-dropdown>
</template>

<style lang="less" scoped>
.avatar {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
</style>