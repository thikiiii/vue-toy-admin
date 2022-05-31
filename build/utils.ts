// 包装 env
export const wrapperEnv = (envConfig: Recordable): ViteEnv => {
    return Object.keys(envConfig).reduce((env, envKey) => {
        let envValue = envConfig[envKey]
        // 判断是否是布尔类型
        envValue = envValue === 'ture' ? true : envValue === 'false' ? false : envValue
        // 判断是否是数字
        if (!isNaN(parseInt(envValue))) envValue = Number(envValue)
        // 判断是否是数组 或 对象
        try {
            envValue = JSON.parse(envValue)
        } catch (e) {
            envValue = envConfig[envKey]
        }
        env[envKey] = envValue
        process.env[envKey] = envValue
        return env
    }, {} as ViteEnv)
}