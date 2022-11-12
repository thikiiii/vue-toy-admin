<script lang="ts" setup>
import { reactive, toRefs } from 'vue'
import { useRouteStore } from '@/store/modules/route'

const routeStore = useRouteStore()

// 按键提示
const keyPrompt = [
  {
    icons: [ { name: 'arrow-left-bottom', iconLibrary: 'mdi' } ],
    prompt: '回车'
  },
  {
    icons: [
      {
        name: 'arrow-up',
        iconLibrary: 'mdi'
      },
      {
        name: 'arrow-down',
        iconLibrary: 'mdi'
      }
    ],
    prompt: '切换'
  },
  {
    icons: [
      {
        name: 'keyboard-esc',
        iconLibrary: 'mdi'
      }
    ],
    prompt: '切换'
  }
]
const state = reactive({
  // 默认激活第一项
  active: 0,
  // 模态框是否可见
  visibleModal: false,
  // 搜索值
  searchText: '',
  // 是否是记录
  isRecord: false,
  // 搜索列表
  menuList: [ {
    icon: 'lock',
    menuList: [ '测试222', '测试2' ],
    path: '/'
  } ]
})

// 搜索菜单
const searchMenus = (menuName: string, menus: Store.MenuOption[]): Store.MenuOption[] => {
  return menus.reduce<Store.MenuOption[]>((menus, menu) => {
    if (menu.meta?.title.includes(menuName)) {
      menus.push({ ...menu, children: [] })
    }
    if (menu.children?.length) {
      const matchingMenus = searchMenus(menuName, menu.children)
      if (matchingMenus.length) {
        menus.push({ ...menu, children: matchingMenus })
      }
    }
    return menus
  }, [])
}

console.log(searchMenus('角色', routeStore.menus))

const { visibleModal, menuList, searchText } = toRefs(state)
</script>

<template>
  <!-- App搜索 -->
  <icon icon="magnify" pointer @click="visibleModal=true" />
  <n-modal v-model:show="visibleModal">
    <n-card
        :bordered="false"
        :segmented="{ content: true,footer: 'soft'}"
        aria-modal="true"
        class="appSearch"
        size="large"
    >
      <n-input v-model="searchText" clearable placeholder="搜索菜单..." size="large">
        <template #suffix>
          <icon icon="magnify" size="22" />
        </template>
      </n-input>
      <div class="appSearch-list">
        <n-card
            v-for="(item,i) in menuList" :key="i"
            hoverable
            size="small">
          <div class="appSearch-list-item">
            <div class="appSearch-list-item-name">
              <icon :icon="item.icon" class="appSearch-list-item-icon" size="22" />
              <span v-for="(title,index) in item.menuList" :key="title">
                {{ title }}
                <icon v-if="index!==item.menuList.length-1" icon="chevron-right" size="20" />
              </span>
            </div>
            <div class="appSearch-list-item-other">
              <icon icon="arrow-left-bottom" size="20" />
            </div>
          </div>
        </n-card>
      </div>
      <n-empty v-if="!menuList.length" description="什么也没有找到" />
      <template #footer>
        <div class="appSearch-footer">
          <div class="appSearch-footer-prompt">
            <div v-for="item in keyPrompt" :key="item.prompt" class="appSearch-footer-prompt-key">
              <icon
                  v-for="icon in item.icons"
                  :key="icon.name"
                  :icon="icon.name"
                  :library="icon.iconLibrary"
                  :pointer="false"
                  class="appSearch-footer-prompt-key-icon"
                  size="16" />
              {{ item.prompt }}
            </div>
          </div>
          <n-button quaternary size="small">
            <template #icon>
              <icon icon="delete-empty-outline" />
            </template>
            清空记录
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<style lang="less" scoped>
.appSearch {
  width: 600px;

  &-list {
    width: 100%;
    max-height: 400px;
    overflow: auto;
    margin-top: 10px;
    padding: 10px 10px 0 10px;

    :deep(.n-card) {
      margin-bottom: 5px;

      .n-card__content {
        width: 100%;
      }

      &:hover {
        background: @theme;
        color: white;
      }
    }

    &-item {
      display: flex;
      justify-content: space-between;
      cursor: pointer;

      &-name {
        display: flex;
        align-items: center;
        flex: 1;
      }

      span {
        display: flex;
        align-items: center;
      }

      &-icon {
        margin-right: 10px;
      }
    }
  }

  &-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-prompt {
      display: flex;
      align-items: center;
      gap: 20px;

      &-key {
        display: flex;
        align-items: center;
        gap: 5px;

        &-icon {
          box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
        }
      }
    }
  }
}


</style>