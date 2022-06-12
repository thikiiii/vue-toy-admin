<template>
    <div class="logo">
        <h3 class="title">Simple Admin</h3>
    </div>
</template>

<script lang="ts" setup>
    import { useLayoutStore } from '@/store/modules/layout'
    import { storeToRefs } from 'pinia'
    
    const layoutStore = useLayoutStore()
    const { headerHeight } = storeToRefs(layoutStore)
</script>

<style lang="less" scoped>
.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: v-bind(headerHeight);
    width: 100%;
    
    .title {
        text-align: center;
    }
}
</style>