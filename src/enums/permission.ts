// 权限模式
export enum PermissionModeEnum {
    // 前端,前端配置路由表，通过用户角色来过滤路由，然后自动生成菜单 （适合角色固定的系统）
    FROUNT = 'FRONT',
    // 后端，后端通过用户角色返回路由表，前端通过路由表自动生成菜单
    SERVER = 'SERVER'
}

// 角色
export enum RoleEnum {
    // 超级管理员
    SUPER = 'super',
    // 管理员
    ADMIN = 'admin',
    // 测试
    TEST = 'test'
}