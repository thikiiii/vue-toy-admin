<template>
    <div class="menu-container">
        <n-menu
            :collapsed="props.collapsed && props.mode==='vertical'"
            :collapsed-width="layoutStore.collapsedWidth"
            :inverted="inverted"
            :mode="props.mode"
            :options="menuOptions.list"
            accordion
            class="menu" />
        <!-- 垂直菜单占位 -->
        <n-menu
            v-if="props.mode==='horizontal'"
            ref="menuRef"
            :inverted="inverted"
            :options="menu"
            class="menu menuPlaceholder"
            mode="horizontal" />
    </div>
</template>

<script lang="ts" setup>
import { MenuOption, NMenu } from 'naive-ui'
import { reactive, ref } from 'vue'
import { useCompressHorizontalMenu } from '@/layout/components/Header/hook/useCompressHorizontalMenu'
import RenderIcon from '@/components/Render/icon'
import RenderEllipsis from '@/components/Render/ellipsis'
import { useLayoutStore } from '@/store/modules/layout'

const layoutStore = useLayoutStore()

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

let menuOptions: { list: MenuOption[] } = reactive({
    list: [
        {
            label: () => RenderEllipsis({ content: '测试测试测试测试测试测试测试测试测试' }),
            key: 'hear-the-wind-sing',
            icon: () => RenderIcon({ icon: 'lock' })
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
    }
}

</style>