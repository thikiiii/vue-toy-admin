import { PermissionEnum, RoleEnum } from '@/enums/auth'
import 'vue-router'

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue-router' {
    // 路由元数据
    interface RouteMeta {
        // 名称
        title: string;
        // 是否忽略权限
        ignoreAuth?: boolean;
        // 细粒度权限
        permissions?: PermissionEnum[];
        // 角色
        roles: RoleEnum[]
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
}

