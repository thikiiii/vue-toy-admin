import { ThemeType } from '@/store/modules/theme'

/**
 * 获取当前操作系统的主题
 * @return 'light' | 'dark'
 * */
export const getSystemTheme = (): ThemeType => {
    const themeMedia = window.matchMedia('(prefers-color-scheme: light)')
    return themeMedia.matches ? 'light' : 'dark'
}

/**
 * 将通过的百分比与 HEX 颜色的 R、G 或 B 相加
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的量
 * @returns {string} 颜色加工部分
 */
function addLight(color: string, amount: number) {
    const cc = parseInt(color, 16) + amount
    const c = cc > 255 ? 255 : cc
    return c.toString(16).length > 1 ? c.toString(16) : `0${ c.toString(16) }`
}

/**
 * 根据通过的百分比淡化 6 char HEX 颜色
 * @param {string} color 要改变的颜色
 * @param {number} amount 改变颜色的量
 * @returns {string} 处理后的颜色表示为 HEX
 */
export function lighten(color: string, amount: number) {
    color = color.indexOf('#') >= 0 ? color.substring(1, color.length) : color
    amount = Math.trunc((255 * amount) / 100)
    return `#${ addLight(color.substring(0, 2), amount) }${ addLight(
        color.substring(2, 4),
        amount
    ) }${ addLight(color.substring(4, 6), amount) }`
}