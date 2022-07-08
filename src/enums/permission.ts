// 权限模式
export enum PermissionModeEnum {
    // 前端,前端配置路由表，通过用户角色来过滤路由，然后自动生成菜单
    FROUNT = 'FRONT',
    // 后端，后端通过用户角色返回路由表，前端通过路由表自动生成菜单
    SERVER = 'SERVER'
}