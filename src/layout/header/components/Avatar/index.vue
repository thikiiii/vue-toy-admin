<script lang="ts" setup>
import useAuthStore from '@/store/modules/auth'

defineOptions({ name: 'Avatar' })

const authStore = useAuthStore()
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

const onSelect = async key => {
    switch (key) {
        case 'user':
            break
        case 'signOut':
            await authStore.signOut()
            break
    }
}
</script>

<template>
  <n-dropdown :options="option" trigger="hover" @select="onSelect">
    <div class="avatar">
      <n-avatar :src="authStore.userinfo?.avatar" round size="medium" />
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
