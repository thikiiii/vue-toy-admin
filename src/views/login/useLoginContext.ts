import { ref } from 'vue'

// 登录方式
export enum LoginMethod {
    // 账号密码登录
    Password,
    // 手机号
    Phone,
    // 二维码
    QrCode
}

type LoginAction = 'PasswordLogin' | 'PhoneLogin' | 'QrCodeLogin' | 'Registered'

const currentAction = ref<LoginAction>('PasswordLogin')

export const useLoginContext = () => {
    const setAction = (action:typeof currentAction.value) => {
        currentAction.value = action
    }
    return { currentAction,setAction }
}


