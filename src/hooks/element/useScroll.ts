import { isRef, nextTick, onMounted, reactive, Ref } from 'vue'

interface UseScrollProps {
    // 滚动容器 ref对象 | HTML元素 | id
    scrollContainer: Ref | HTMLElement | string

    // 是否开启滚动动画
    isAnimation?: boolean
}

interface UseScroll {
    // 是否滚动中
    isScrolling: boolean

    // 当前滚动位置
    currentPosition: {
        x: number
        y: number
    }

    // 滚动到 指定元素 | 指定位置
    to(to: Element | number): void

    // 滚动到底部
    toBottom(): void

    // 滚动到顶部
    toTop(): void
}

export const useScroll = (props: UseScrollProps): UseScroll => {
    if (!props || !props.scrollContainer) throw '请携带参数'
    const { scrollContainer } = props
    let container: HTMLElement

    const scrollTool: UseScroll = reactive({
        isScrolling: false,
        currentPosition: {
            x: 0,
            y: 0
        },
        to(to) {
            console.log(to)
        },
        toBottom() {
        },
        toTop() {
        }
    })

    onMounted(() => {
        if (typeof scrollContainer === 'string') {
            const element = document.getElementById(scrollContainer)
            if (element === null) throw '未找到元素'
            container = element
        } else if (isRef(scrollContainer)) {
            container = scrollContainer.value.$el || scrollContainer.value
        } else {
            container = scrollContainer
        }
        console.log(container)
        container.addEventListener('scroll', () => {
            console.log(11)
            scrollTool.isScrolling = true
            void nextTick(() => {
                scrollTool.isScrolling = false
            })
        })
    })

    return scrollTool
}