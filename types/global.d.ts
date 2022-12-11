declare type Nullable<T> = T | null;
declare type NonNullable<T> = T extends null | undefined ? never : T;
declare type Recordable<T = any> = Record<string, T>;


interface Window {
    $message?: import('naive-ui').MessageApi
    $dialog?: import('naive-ui').DialogApi
    $notification?: import('naive-ui').NotificationApi
    $loadingBar?: import('naive-ui').LoadingBarApi
}

/**
 * 策略模式
 * [状态, 为true时执行的回调函数]
 */
declare type TacticsAction = [ boolean, () => void ]


// 设置
declare type AppSettings = Omit<Store.LayoutStore, 'mobile'> & Pick<Store.ThemeStore, 'theme' | 'themeMode'>

