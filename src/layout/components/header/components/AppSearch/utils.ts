export const appSearchkeyPrompt = [
    {
        icons: [
            {
                name: 'arrow-left-bottom',
                iconLibrary: 'mdi'
            }
        ],
        prompt: '回车'
    },
    {
        icons: [
            {
                name: 'arrow-up-thin',
                iconLibrary: 'mdi'
            },
            {
                name: 'arrow-down-thin',
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
        prompt: '关闭'
    }
]

// 搜索菜单
export const searchMenus = (menuName: string, menus: Store.MenuOption[]): Store.MenuOption[] => {
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

// 处理结果
export const handleResult = (result: Store.MenuOption[]): System.AppMenuSearchHistoryRecord[] => {
    const menuList: System.AppMenuSearchHistoryRecord[] = []
    const handle = (menus: Store.MenuOption[], iconName?: string | undefined, menuNameList?: string[]) => {
        menus.forEach((menu) => {
            const icon = iconName || menu.meta?.icon
            const menuNames = menuNameList || []
            if (!menu.children?.length) {
                menuList.push({
                    icon: icon as string,
                    menuNameList: [ ...menuNames, menu.meta?.title as string ],
                    path: menu.key
                })
            } else {
                menuNames.push(menu.meta?.title as string)
                handle(menu.children, icon, menuNames)
            }
        })
    }
    handle(result)
    return menuList
}