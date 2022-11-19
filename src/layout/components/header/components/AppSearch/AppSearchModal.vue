<script lang="ts" setup>
import { useRouteStore } from '@/store/modules/route'
import { computed, reactive, toRefs, watch } from 'vue'
import { SystemStorage } from '@/storage/system'
import { appSearchkeyPrompt, handleResult, searchMenus } from './utils'
import { useRouter } from 'vue-router'
import { useThrottleFn } from '@vueuse/core'

interface State {
  // 搜索内容
  searchText: string,
  // 搜索结果
  searchResults: System.AppMenuSearchHistoryRecord[]
  // 激活（默认激活索引0）
  active: number
}

defineOptions({ name: 'AppSearchModal' })
const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
  (e: 'update:visible', isShow: boolean): void
}>()

const router = useRouter()
const routeStore = useRouteStore()

const state: State = reactive({
  searchText: '',
  searchResults: [],
  active: 0
})

const visible = computed({
  get() {
    return props.visible
  },
  set(newValue: boolean) {
    emit('update:visible', newValue)
  }
})


// 跳转到菜单
const jumpToMenu = (resultItem: System.AppMenuSearchHistoryRecord) => {
  router.push(resultItem.path)
  SystemStorage.addSearchHistory(resultItem)
  emit('update:visible', false)
}

// 情况历史记录
const clearSearchHistory = () => {
  SystemStorage.clearSearchHistory()
  if (state.searchText.length && state.searchResults.length) return
  else state.searchResults = []
}

// 处理键盘事件
const handleKeyboardEvents = (event: KeyboardEvent) => {
  const length = state.searchResults.length
  if (!length) return
  switch (event.code) {
    case 'ArrowUp':
      state.active === 0 ? state.active = length - 1 : state.active -= 1
      break
    case 'ArrowDown':
      state.active === length - 1 ? state.active = 0 : state.active += 1
      break
    case 'Enter':
      jumpToMenu(state.searchResults[state.active])
      break
  }
}

watch(() => state.searchText, useThrottleFn(() => {
  const text = state.searchText
  state.searchResults = !text ? SystemStorage.getSearchHistory() || [] : handleResult(searchMenus(text, routeStore.menus))
  state.active = 0
}, 200))

watch(visible, () => {
  if (!visible.value) return
  state.searchResults = SystemStorage.getSearchHistory()
  state.searchText = ''
  state.active = 0
  visible.value ?
      window.addEventListener('keyup', handleKeyboardEvents) :
      window.removeEventListener('keyup', handleKeyboardEvents)
})


const { searchText, searchResults, active } = toRefs(state)
</script>
<template>
  <n-modal v-model:show="visible">
    <n-card
        :bordered="false"
        :segmented="{ content: true,footer: 'soft'}"
        aria-modal="true"
        class="appSearch"
        role="dialog"
        size="large"
    >

      <n-input v-model:value.trim="searchText" clearable placeholder="搜索菜单..." size="large">
        <template #suffix>
          <icon icon="magnify" size="22" />
        </template>
      </n-input>
      <div class="appSearch-list">
        <n-card
            v-for="(item,i) in searchResults"
            :key="i"
            :class="active===i?'active':undefined"
            hoverable
            size="small"
            @click="jumpToMenu(item)"
            @mouseenter="state.active = i">
          <div class="appSearch-list-item">
            <div class="appSearch-list-item-name">
              <icon :icon="item.icon" class="appSearch-list-item-icon" size="22" />
              <span v-for="(title,index) in item.menuNameList" :key="title">
                {{ title }}
                <icon v-if="index!==item.menuNameList.length-1" icon="chevron-right" size="20" />
              </span>
            </div>
            <div class="appSearch-list-item-other">
              <icon icon="arrow-left-bottom" size="20" />
            </div>
          </div>
        </n-card>
      </div>
      <n-empty v-if="!searchResults.length" description="空空如也" />
      <template #footer>
        <div class="appSearch-footer">
          <div class="appSearch-footer-prompt">
            <div v-for="item in appSearchkeyPrompt" :key="item.prompt" class="appSearch-footer-prompt-key">
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
          <n-button quaternary size="small" @click="clearSearchHistory">
            <template #icon>
              <icon icon="delete-empty-outline" />
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