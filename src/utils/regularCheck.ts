// 匹配数字
export const matchNumbers = /\D/gi

// 提取数字
export const extractNumbers = (str: string) => Number(str.replace(matchNumbers, ''))

// 匹配URL
export const matchUrl = /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
