import { MenuOption, NMenu } from 'naive-ui'
import { onMounted, Ref } from 'vue'

import { useDebounceFn } from '@vueuse/core'
import RenderIcon from '@/components/Render/icon'


// 压缩水平菜单配置项
interface CompressHorizontalMenuOption {
    // 菜单 element
    menuRef: Ref<InstanceType<typeof NMenu> | null>
    // 菜单列表
    menuList: MenuOption[]

    // 传递过滤好的值
    filter(filterMenu: MenuOption[]): void
}

// 压缩水平菜单
export const useCompressHorizontalMenu = (
    { menuRef, menuList, filter }: CompressHorizontalMenuOption) => {
    const compressHorizontalMenu = () => {
        if (!menuRef.value) return
        const { offsetWidth, children } = menuRef.value.$el as HTMLElement
        // 宽度总和
        let widthSum = 0
        const index = Array.from(children).findIndex((item, i, arr) => {
            widthSum += item.clientWidth
            if (widthSum >= offsetWidth || offsetWidth - widthSum < arr[i + 1].clientWidth / 2) return true
        })
        filter([
            // 截取不需要压缩的菜单
            ...menuList.slice(0, index),
            {
                icon: () => RenderIcon({ icon: 'ellipsis-outlined' }),
                key: '...',
                // 截取需要压缩的菜单
                children: menuList.slice(index)
            }
        ])
    }

    onMounted(() => {
        const debouncedFn = useDebounceFn(compressHorizontalMenu, 500)
        compressHorizontalMenu()
        window.addEventListener('resize', debouncedFn)
    })
}