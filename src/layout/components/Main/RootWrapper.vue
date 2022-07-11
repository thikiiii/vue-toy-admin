<!-- 千万不要再 template 中写注释，会出现bug！！！ -->
<!-- 根包装：解决 transition 与 keepAlive 同时用，组件缓存无效的问题 -->
<template>
    <div class="rootWrapper">
        <slot />
    </div>
</template>

<style lang="less" scoped>
.rootWrapper {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0 20px;
}
</style>