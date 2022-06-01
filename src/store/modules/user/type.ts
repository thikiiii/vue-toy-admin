export interface UserStore {
    token: string
    // 用户信息
    userinfo: Nullable<Userinfo>
}

// 用户信息
export interface Userinfo {
    userId: string | number
    // 用户名
    username: string
    // 头像
    avatar: string
}