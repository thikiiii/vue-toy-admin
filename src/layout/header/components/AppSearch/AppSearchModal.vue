<script lang="ts" setup>
  import { useRouteStore } from '@/store/modules/route'
  import { reactive, toRefs, watch } from 'vue'
  import { AppStorage } from '@/storage/app'
  import { appSearchKeyPrompt, handleResult, searchMenus } from './utils'
  import { useRouter } from 'vue-router'
  import { useDebounceFn, useEventListener, useVModel } from '@vueuse/core'
  import { RouterHelpers } from '@/router/helpers'

  // 菜单搜索历史记录
  export interface AppMenuSearchHistoryRecord {
    icon: string
    menuNameList: string[]
    path: string
  }

  interface Props {
    // 可见
    visible: boolean
  }

  interface Emits {
    (e: 'update:visible', isShow: boolean): void
  }

  interface State {
    // 搜索内容
    searchText: string
    // 搜索结果
    searchResults: AppMenuSearchHistoryRecord[]
    // 激活（默认激活索引0）
    active: number
  }

  defineOptions({ name: 'AppSearchModal' })
  const props = withDefaults(defineProps<Props>(), { visible: false })
  const emit = defineEmits<Emits>()

  const router = useRouter()
  const routeStore = useRouteStore()

  const visible = useVModel(props, 'visible', emit)

  const state: State = reactive({
    searchText: '',
    searchResults: [],
    active: 0,
  })

  // 跳转到菜单
  const jumpToMenu = (resultItem: AppMenuSearchHistoryRecord) => {
    // 如果是外链就打开外链，不是就跳转路由
    RouterHelpers.isExternalLink(resultItem.path)
      ? RouterHelpers.openTheLink(resultItem.path)
      : router.push(resultItem.path)
    AppStorage.addSearchHistory(resultItem)
    emit('update:visible', false)
  }

  // 清空历史记录
  const clearSearchHistory = () => {
    AppStorage.clearSearchHistory()
    if (!state.searchText.length && !state.searchResults.length) state.searchResults = []
  }

  // 处理键盘事件
  const handleKeyboardEvents = (event: KeyboardEvent) => {
    const length = state.searchResults.length
    if (!length) return
    switch (event.code) {
      case 'ArrowUp':
        state.active === 0 ? (state.active = length - 1) : (state.active -= 1)
        break
      case 'ArrowDown':
        state.active === length - 1 ? (state.active = 0) : (state.active += 1)
        break
      case 'Enter':
        jumpToMenu(state.searchResults[state.active])
        break
    }
  }

  watch(
    () => state.searchText,
    useDebounceFn(() => {
      const text = state.searchText
      state.searchResults = !text
        ? AppStorage.getSearchHistory() || []
        : handleResult(searchMenus(text, routeStore.menus))
      state.active = 0
    }, 200),
  )

  watch(visible, () => {
    if (!visible.value) return
    state.searchResults = AppStorage.getSearchHistory()
    state.searchText = ''
    state.active = 0
    useEventListener(window, 'keyup', handleKeyboardEvents)
  })

  const { searchText, searchResults, active } = toRefs(state)
</script>
<template>
  <n-modal v-model:show="visible">
    <n-card
      :bordered="false"
      :segmented="{ content: true, footer: 'soft' }"
      aria-modal="true"
      class="appSearch"
      role="dialog"
      size="large"
    >
      <n-input v-model:value.trim="searchText" clearable placeholder="搜索菜单..." size="large">
        <template #suffix>
          <icon icon="mdi:magnify" />
        </template>
      </n-input>
      <div class="appSearch-list">
        <n-card
          v-for="(item, i) in searchResults"
          :key="i"
          :class="active === i ? 'active' : undefined"
          hoverable
          size="small"
          @click="jumpToMenu(item)"
          @mouseenter="state.active = i"
        >
          <div class="appSearch-list-item">
            <div class="appSearch-list-item-name">
              <icon :icon="item.icon" class="appSearch-list-item-icon" />
              <span v-for="(title, index) in item.menuNameList" :key="title">
                {{ title }}
                <icon
                  v-if="index !== item.menuNameList.length - 1"
                  icon="mdi:chevron-right"
                  size="20"
                />
              </span>
            </div>
            <div class="appSearch-list-item-other">
              <icon icon="mdi:arrow-left-bottom" size="20" />
            </div>
          </div>
        </n-card>
      </div>
      <n-empty v-if="!searchResults.length" description="空空如也" />
      <template #footer>
        <div class="appSearch-footer">
          <div class="appSearch-footer-prompt">
            <div
              v-for="item in appSearchKeyPrompt"
              :key="item.prompt"
              class="appSearch-footer-prompt-key"
            >
              <icon
                v-for="icon in item.icons"
                :key="icon"
                :icon="icon"
                :pointer="false"
                class="appSearch-footer-prompt-key-icon"
                size="16"
              />
              {{ item.prompt }}
            </div>
          </div>
          <n-button quaternary size="small" @click="clearSearchHistory">
            <template #icon>
              <icon icon="mdi:delete-empty-outline" />
            </template>
            清空搜索历史
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
        transition: none;

        .n-card__content {
          width: 100%;
        }

        &.active {
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
