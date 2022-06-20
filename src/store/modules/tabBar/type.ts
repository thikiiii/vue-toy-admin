import { Meta } from '@/router/types'

export interface TabBarStore {
    // 缓存白名单
    cacheWhiteList: string[],
    // 标签栏
    tabBar: TabBar[]
    // 激活
    active: string
}

export interface TabBar extends Pick<Meta, 'title' | 'keepAlive'> {
    // 路由
    path: string,
}