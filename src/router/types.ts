import { RouteRecordRaw } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>);

// 路由
export type AppRouteRecordRaw = Omit<RouteRecordRaw, 'meta' | 'component' | 'children'> | {
    meta?: Meta,
    component: Component | string,
    children: AppRouteRecordRaw[],
    props?: Recordable | boolean
}


// 路由元数据
export interface Meta {
    // 名称
    title: string;
    // 是否忽略权限
    ignoreAuth?: boolean;
    permissions?: string[];
    // 是否缓存
    keepAlive?: boolean;
    // 是否固定在tab上
    affix?: boolean;
    // tab上的图标
    icon?: string;
    // 跳转地址
    frameSrc?: string;
    // 外链跳转地址
    externalLink?: string;
    //隐藏
    hidden?: boolean;
}