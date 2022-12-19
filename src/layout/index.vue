<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import LayoutHeader from '@/layout/header/index.vue'
import LayoutMain from '@/layout/main/index.vue'
import LayoutSidebar from '@/layout/sidebar/index.vue'
import LayoutTabBar from '@/layout/tabBar/index.vue'
import LayoutFooter from '@/layout/footer/index.vue'

defineOptions({ name: 'Layout' })

const layoutStore = useLayoutStore()

const { header, footer } = layoutStore.$state
</script>

<template>
  <!-- n-layout 的作用是让子元素继承 n-layout 的字体颜色 -->
  <n-layout>
    <div class="layout">
      <layout-sidebar/>
      <div class="layout-scroll">
        <div :class="header.isFixedHeaderAndTabBar?'fixed':undefined">
          <layout-header/>
          <layout-tab-bar v-if="header.tabBarVisible"/>
        </div>
        <layout-main/>
        <layout-footer v-if="footer.footerVisible"/>
      </div>
    </div>
  </n-layout>
</template>

<style lang="less" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;

  &-scroll {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .fixed {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
</style>