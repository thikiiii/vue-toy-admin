<template>
  <div class="logo">
    <h3 class="title">Toy Admin</h3>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: @headerHeight;
    width: 100%;
    flex-shrink: 0;
    transition: 0.2s ease-in-out;
    .title {
      text-align: center;
    }
  }
</style>
