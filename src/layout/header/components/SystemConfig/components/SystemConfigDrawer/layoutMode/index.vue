<script lang="ts" setup>
  import LayoutCard from '../components/LayoutCard/index.vue'
  import { useLayoutStore } from '@/store/modules/layout'
  import { layoutModeList } from '@/settings/app'

  defineOptions({ name: 'MenuMode' })
  const layoutStore = useLayoutStore()
  const { app } = layoutStore.$state
</script>

<template>
  <n-divider title-placement="center">布局模式</n-divider>
  <div class="layoutMode">
    <layout-card
      v-for="item in layoutModeList"
      :key="item.value"
      :active="item.value === app.layoutMode"
      :popover-content="item.label"
      @click-card="app.layoutMode = item.value"
    >
      <div v-if="item.value === 'Side'" class="vertical">
        <div class="side"></div>
        <div class="container">
          <div class="header"></div>
          <div class="main"></div>
        </div>
      </div>
      <div v-if="item.value === 'MixSide'" class="vertical">
        <div class="mixSide">
          <div></div>
          <div></div>
        </div>
        <div class="container">
          <div class="header"></div>
          <div class="main"></div>
        </div>
      </div>
      <div v-if="item.value === 'Top'" class="horizontal">
        <div class="header primary"></div>
        <div class="main"></div>
      </div>
    </layout-card>
  </div>
</template>

<style lang="less" scoped>
  .layoutMode {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    justify-items: center;
    gap: 20px 0;

    .vertical {
      display: flex;
      height: 100%;
      gap: 3px;
    }

    .horizontal {
      display: flex;
      height: 100%;
      flex-direction: column;
      gap: 3px;
    }

    .header,
    .side,
    .mixSide,
    .main {
      border-radius: 2px;
      background: @fadedThemeColor;
    }

    .header {
      height: 10px;
      background: @fadedThemeColor;
    }

    .primary {
      background: @theme;
    }

    .side {
      width: 13px;
      height: 100%;
      background: @theme;
    }

    .mixSide {
      width: 13px;
      height: 100%;
      display: flex;

      div:first-of-type {
        width: 6px;
        height: 100%;
        background: @theme;
        border-radius: 3px;
      }

      div:last-of-type {
        background: @fadedThemeColor;
        width: 10px;
        height: 100%;
      }
    }

    .container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .main {
      flex: 1;
    }
  }
</style>
