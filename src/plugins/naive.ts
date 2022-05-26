// 解决 naive-ui 和 tailwind 样式冲突
export const solveStyleConflict = () => {
    const meta = document.createElement('meta')
    meta.name = 'naive-ui-style'
    document.head.appendChild(meta)
}