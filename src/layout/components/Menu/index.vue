<template>
    <n-menu
        class="menu"
        ref="menuRef"
        :mode="props.mode"
        :collapsed-width="sidebarCollapsedWidth"
        :inverted="inverted"
        accordion
        :collapsed="props.collapsed && props.mode==='vertical'"
        :options="menuOptions.list" />
</template>

<script lang="ts" setup>
import { MenuOption, NMenu } from 'naive-ui'
import { renderEllipsis, renderIcon } from '@/utils/render'
import { useLayoutStore } from '@/store/modules/layout'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { useCompressHorizontalMenu } from '@/layout/hook/useCompressHorizontalMenu'

interface Props {
    // 模式
    mode?: 'vertical' | 'horizontal'
    // 折叠
    collapsed?: boolean
    // 对比
    inverted?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    mode: 'vertical',
    collapsed: false,
    inverted: false
})

const layoutStore = useLayoutStore()
const { sidebarCollapsedWidth } = storeToRefs(layoutStore)

let menuOptions: { list: MenuOption[] } = reactive({
    list: [
        {
            label: () => renderEllipsis({ content: '测试测试测试' }),
            key: 'hear-the-wind-sing',
            icon: () => renderIcon({ icon: 'user-outlined' })
        },
        {
            label: '1973年的弹珠玩具',
            key: 'pinball-1973'
            // icon: () => renderIcon({ icon: 'user-outlined' }),
            // children: [
            //     {
            //         label: '鼠',
            //         key: 'rat'
            //     }
            // ]
        },
        {
            label: '寻羊冒险记1',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记2',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记3',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记4',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记5',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记6',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记7',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记8',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记9',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记10',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记11',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记12',
            key: 'a-wild-sheep-chase'
            // icon: renderIcon(BookIcon)
        },
        {
            label: '寻羊冒险记13',
            key: 'a-wild-sheep-chase'
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
})
const menuRef = ref<InstanceType<typeof NMenu> | null>(null)
props.mode === 'horizontal' && useCompressHorizontalMenu({
    menuRef,
    menuList: menuOptions.list,
    filter(filterMenu) {
        menuOptions.list = filterMenu
    }
})

</script>

<style lang="less" scoped>
.menu {
    width: 100%;
    
    :deep(.n-menu-item), :deep(.n-submenu) {
        flex-shrink: 0;
    }
}

</style>