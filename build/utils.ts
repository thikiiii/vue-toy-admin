// 包装 env
export const wrapperEnv = (envConfig: Recordable): ImportMetaEnv => {
    return Object.keys(envConfig).reduce((env, envKey) => {
        let envValue = envConfig[envKey]
        // 判断是否是布尔类型
        envValue = envValue === 'true' ? true : envValue === 'false' ? false : envValue
        // 判断是否是数字
        if (!isNaN(parseInt(envValue))) envValue = Number(envValue)
        env[envKey] = envValue
        process.env[envKey] = envValue
        return env
    }, {} as ImportMetaEnv)
}