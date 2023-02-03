<script lang="ts" setup>
  import LayoutCard from '../components/LayoutCard/index.vue'
  import { layoutStyleList } from '@/settings/app'
  import { useLayoutStore } from '@/store/modules/layout'

  defineOptions({ name: 'LayoutStyle' })
  const layoutStore = useLayoutStore()
  const { app } = layoutStore.$state
</script>

<template>
  <n-divider title-placement="center">布局风格</n-divider>
  <div class="layoutStyle">
    <layout-card
      v-for="item in layoutStyleList"
      :key="item.value"
      :active="item.value === app.layoutStyle"
      :popover-content="item.label"
      @click-card="app.layoutStyle = item.value"
    >
      <div v-if="item.value === 'SideDark'" class="vertical">
        <div class="side dark"></div>
        <div class="container">
          <div class="header"></div>
          <div class="main"></div>
        </div>
      </div>
      <div v-if="item.value === 'SideTopDark'" class="vertical">
        <div class="side dark"></div>
        <div class="container">
          <div class="header dark"></div>
          <div class="main"></div>
        </div>
      </div>
      <div v-if="item.value === 'SideTopLight'" class="vertical">
        <div class="side light"></div>
        <div class="container">
          <div class="header light"></div>
          <div class="main"></div>
        </div>
      </div>
    </layout-card>
  </div>
</template>

<style lang="less" scoped>
  @darkColor: #464e62;
  @lightColor: #f9fafc;
  .layoutStyle {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    justify-items: center;

    .vertical {
      display: flex;
      height: 100%;
      gap: 3px;
    }

    .header,
    .side,
    .main {
      border-radius: 2px;
      background: @fadedThemeColor;
    }

    .header {
      height: 10px;
    }

    .side {
      width: 13px;
      height: 100%;
    }

    .container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .dark {
      background: @darkColor;
    }

    .light {
      background: @lightColor;
    }

    .main {
      flex: 1;
    }
  }
</style>
