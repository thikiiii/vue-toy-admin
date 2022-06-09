<template>
  <n-menu class="menu" :collapsed-width="sidebarCollapsedWidth" :collapsed="collapsed" :options="menuOptions" />
</template>

<script lang="ts" setup>

import type { MenuOption } from 'naive-ui'
import { renderEllipsis, renderIcon } from '@/utils/render'
import { useLayoutStore } from '@/store/modules/layout'

const layoutStore = useLayoutStore()
const { sidebarCollapsedWidth, collapsed } = storeToRefs(layoutStore)
const menuOptions: MenuOption[] = [
  {
    label: () => renderEllipsis({ content: '测试测试测试测试测试测试测试测试测试' }),
    key: 'hear-the-wind-sing',
    icon: () => renderIcon({ icon: 'lock' })
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: () => renderIcon({ icon: 'lock' }),
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true
    // icon: renderIcon(BookIcon)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    // icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator'
            // icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man'
            // icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        // icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes2'
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes1'
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes3'
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes4'
      },
      {
        label: '过去增多，未来减少',
        key: 'the-past-increases-the-future-recedes5'
      }
    ]
  }
]
</script>

<style lang="less" scoped>

</style>