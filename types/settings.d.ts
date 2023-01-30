declare type AppSettings = Omit<Store.LayoutStore, 'mobile'> &
    Pick<Store.ThemeStore, 'theme' | 'themeMode' | 'followSystem'>
