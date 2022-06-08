<template>
  <div class="logo">
    <h3 class="title">Simple Admin</h3>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: @layout-header-height;
  border-bottom: 1px solid @divder;
  width: 100%;

  .title {
    color: @textColor;
    text-align: center;
  }
}
</style>