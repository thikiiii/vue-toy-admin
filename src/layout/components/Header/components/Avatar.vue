<script lang="ts" setup>
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
</script>

<template>
    <n-dropdown :options="option" trigger="hover">
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