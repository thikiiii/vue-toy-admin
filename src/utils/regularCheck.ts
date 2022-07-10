// 匹配数字
export const matchNumbers = /\D/ig

// 提取数字
export const extractNumbers = (str: string) => Number(str.replace(matchNumbers, ''))
