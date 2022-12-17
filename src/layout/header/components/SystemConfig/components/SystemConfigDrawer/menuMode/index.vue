<script lang="ts" setup>
// 菜单模式
import { useLayoutStore } from '@/store/modules/layout'

defineOptions({ name: 'MenuMode' })
const layoutStore = useLayoutStore()
const { app } = layoutStore.$state

const isActive = (mode: Store.MenuMode) => {
  return app.menuMode === mode ? 'active' : undefined
}
const setMenuMode = (mode: Store.MenuMode) => {
  app.menuMode = mode
}
</script>

<template>
  <n-divider title-placement="center">菜单模式</n-divider>
  <div class="menuMode">
    <n-popover placement="bottom" trigger="hover">
      <template #trigger>
        <div :class="isActive('Side')" class="menuMode-card sideMode" @click="setMenuMode('Side')">
          <div class="sideMode-side"></div>
          <div class="sideMode-main"></div>
        </div>
      </template>
      <span>左侧菜单模式</span>
    </n-popover>
    <n-popover placement="bottom" trigger="hover">
      <template #trigger>
        <div :class="isActive('MixSide')" class="menuMode-card sideMixMode" @click="setMenuMode('MixSide')">
          <div class="sideMixMode-sideMix">
            <div></div>
            <div></div>
          </div>
          <div class="sideMixMode-main"></div>
        </div>
      </template>
      <span>左侧菜单混合模式</span>
    </n-popover>
    <n-popover placement="bottom" trigger="hover">
      <template #trigger>
        <div :class="isActive('Top')" class="menuMode-card topMode" @click="setMenuMode('Top')">
          <div class="topMode-top"></div>
          <div class="topMode-main"></div>
        </div>
      </template>
      <span>顶部菜单模式</span>
    </n-popover>
  </div>
</template>

<style lang="less" scoped>
.menuMode {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  justify-items: center;

  &-card {
    background: @mainBackgroundColor;
    height: 65px;
    width: 75px;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 5px 5px 5px @shadow;
    transition: .3s ease-out;
    border: 3px solid @fadedThemeColor;
    display: flex;
    padding: 4px;
    gap: 4px;

    &.active {
      box-shadow: 5px 5px 5px @themeShadow;
      border-color: @theme;
    }

    &.sideMode {
      .sideMode-side {
        width: 15px;
        height: 100%;
        border-radius: 6px;
        background: @theme;
      }

      .sideMixMode-main, .sideMode-main {
        flex: 1;
        border-radius: 6px;
        background: @fadedThemeColor;
      }
    }

    &.sideMixMode {

      .sideMixMode-sideMix {
        display: flex;
        border-radius: 3px;
        overflow: hidden;
        div:nth-of-type(1) {
          width: 8px;
          height: 100%;
          background: @theme;
          border-radius: 3px;
        }

        div:nth-of-type(2) {
          background: @fadedThemeColor;
          width: 12px;
          height: 100%;
        }
      }

      .sideMixMode-main {
        flex: 1;
        border-radius: 6px;
        background: @fadedThemeColor;
      }
    }

    &.topMode {
      display: flex;
      flex-direction: column;
      padding: 4px;
      gap: 4px;

      .topMode-top {
        height: 12px;
        width: 100%;
        background: @theme;
        border-radius: 6px;
      }

      .topMode-main {
        flex: 1;
        border-radius: 6px;
        background: @fadedThemeColor;
      }
    }
  }

}
</style>