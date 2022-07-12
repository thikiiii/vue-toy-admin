<script lang="ts" setup>
import useAuthStore from '@/store/modules/auth'

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
const onSelect = (key) => {
    switch (key) {
        case 'user':
            break
        case 'signOut':
            authStore.signOut()
    }
}
</script>

<template>
    <n-dropdown :options="option" trigger="hover" @select="onSelect">
        <div class="avatar">
            <n-avatar
                round
                size="medium"
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            />
            Simple Admin
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