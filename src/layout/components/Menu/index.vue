<template>
    <div class="menu-container">
        <n-menu
            class="menu"
            :mode="props.mode"
            :collapsed-width="sidebarCollapsedWidth"
            :inverted="inverted"
            accordion
            :collapsed="props.collapsed && props.mode==='vertical'"
            :options="menuOptions.list" />
        <!-- 垂直菜单占位 -->
        <n-menu
            v-if="props.mode==='horizontal'"
            class="menu menuPlaceholder"
            ref="menuRef"
            mode="horizontal"
            :inverted="inverted"
            :options="menu" />
    </div>
</template>

<script lang="ts" setup>
import { MenuOption, NMenu } from 'naive-ui'
import { renderEllipsis, renderIcon } from '@/utils/render'
import { useLayoutStore } from '@/store/modules/layout'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { useCompressHorizontalMenu } from '@/layout/components/Header/hook/useCompressHorizontalMenu'

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
        },
        {
            label: '寻羊冒险记1',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记2',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记3',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记4',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记5',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记6',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记7',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记8',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记9',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记10',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记11',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记12',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '寻羊冒险记13',
            key: 'a-wild-sheep-chase'
        },
        {
            label: '舞，舞，舞',
            key: 'dance-dance-dance',
            children: [
                {
                    type: 'group',
                    label: '人物',
                    key: 'people',
                    children: [
                        {
                            label: '叙事者',
                            key: 'narrator'
                        },
                        {
                            label: '羊男',
                            key: 'sheep-man'
                        }
                    ]
                },
                {
                    label: '饮品',
                    key: 'beverage',
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
const menu = [ ...menuOptions.list ]
const menuRef = ref<InstanceType<typeof NMenu> | null>(null)
// 水平菜单压缩
props.mode === 'horizontal' && useCompressHorizontalMenu({
    menuRef,
    menuList: menu,
    filter(filterMenu) {
        menuOptions.list = filterMenu
    }
})

</script>

<style lang="less" scoped>
// 这块的样式不要改，会影响水平菜单压缩
.menu-container {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    overflow: hidden;
    
    .menu {
        width: 100%;
        
        :deep(.n-menu-item), :deep(.n-submenu) {
            flex-shrink: 0;
        }
    }
    
    .menuPlaceholder {
        visibility: hidden;
        position: absolute;
        background: #5a6bff;
    }
}

</style>