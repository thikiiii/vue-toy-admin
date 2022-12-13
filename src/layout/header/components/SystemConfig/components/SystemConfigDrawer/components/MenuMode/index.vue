<template>
  <n-divider title-placement="center">菜单模式</n-divider>
  <div class="menuMode">
    <div class="menuMode-card sideMode">
      <div class="sideMode-side"></div>
      <div class="sideMode-main"></div>
    </div>
    <div class="menuMode-card sideMixMode">
      <div class="sideMixMode-sideMix">
        <div></div>
        <div></div>
      </div>
      <div class="sideMixMode-main"></div>
    </div>
    <div class="menuMode-card"></div>
  </div>
</template>

<script lang="ts" setup>
// 菜单模式
</script>

<style lang="less" scoped>
.menuMode {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  justify-items: center;

  &-card {
    background: @mainBackgroundColor;
    height: 75px;
    width: 75px;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 5px 5px 5px @shadow;

    &.sideMode {
      display: flex;
      padding: 4px;
      gap: 4px;

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
      display: flex;
      padding: 4px;
      gap: 4px;

      .sideMixMode-sideMix {
        display: flex;

        div:nth-of-type(1) {
          width: 8px;
          height: 100%;
          border-radius: 2px;
          background: @theme;
        }

        div:nth-of-type(2) {
          background: @fadedThemeColor;
          width: 12px;
          border-radius: 2px;
          height: 100%;
        }
      }

      .sideMixMode-main {
        flex: 1;
        border-radius: 6px;
        background: @fadedThemeColor;
      }
    }
  }

}
</style>