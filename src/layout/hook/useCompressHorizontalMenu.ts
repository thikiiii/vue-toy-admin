import { MenuOption, NMenu } from 'naive-ui'
import { onMounted, reactive, Ref } from 'vue'
import { renderIcon } from '@/utils/render'
import { useDebounceFn } from '@vueuse/core'

// 压缩水平菜单返回值
interface FilterMenu {
    // 需要压缩的菜单列表
    compressMenu: MenuOption[]
    // 不需要压缩的菜单
    noCompressionMneu: MenuOption[]
}

// 压缩水平菜单配置项
interface CompressHorizontalMenuOption {
    // 菜单 element
    menuRef: Ref<InstanceType<typeof NMenu> | null>
    // 菜单列表
    menuList: MenuOption[]
    // 宽度差值
    widthDifference?: number

    // 传递过滤好的值
    filter(filterMenu: MenuOption[]): void
}


// 压缩水平菜单
export const useCompressHorizontalMenu = (
    { menuRef, menuList, widthDifference = 40, filter }: CompressHorizontalMenuOption) => {
    const filterMenu: FilterMenu = reactive({
        // 需要压缩的菜单列表
        compressMenu: [],
        // 不需要压缩的菜单
        noCompressionMneu: []
    })

    const compressHorizontalMenu = () => {
        if (!menuRef.value) return
        const { offsetWidth, children } = menuRef.value.$el as HTMLElement
        // 宽度总和
        let widthSum = 0
        const index = Array.from(children).findIndex((item) => {
            widthSum += item.clientWidth
            // 如果宽度总和大于等于最大宽度 或者 最大宽度减去宽度总和小于宽度差值 就返回 index
            if (widthSum >= offsetWidth || offsetWidth - widthSum < widthDifference) return true
        })
        // 截取需要压缩的菜单
        filterMenu.compressMenu = menuList.slice(index)
        // 截取不需要压缩的菜单
        filterMenu.noCompressionMneu = menuList.slice(0, index)
        filter([
            ...filterMenu.noCompressionMneu,
            {
                icon: () => renderIcon({ icon: 'ellipsis-outlined' }),
                key: '...',
                children: filterMenu.compressMenu
            }
        ])
    }

    onMounted(() => {
        const debouncedFn = useDebounceFn(compressHorizontalMenu, 500)
        compressHorizontalMenu()
        window.addEventListener('resize', debouncedFn)
    })
}