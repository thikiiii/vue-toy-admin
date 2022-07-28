import { isRef, onMounted, reactive, Ref, unref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

interface UseScroll {
    // 是否滚动中
    isScrolling: boolean

    // 当前滚动位置
    currentPosition: {
        x: number
        y: number
    }

    // 滚动到 指定元素 | 指定位置
    to(to: Ref<HTMLElement | unknown> | HTMLElement | number, behavior: ScrollBehavior): void

    // 滚动到底部
    toBottom(): void

    // 滚动到顶部
    toTop(): void
}

// 滚动容器 ref对象 | HTML元素 | id

export const useScroll = (scrollContainer: Ref<HTMLElement | unknown> | HTMLElement): UseScroll => {
    const container = unref(scrollContainer)
    const scrollTool: UseScroll = reactive({
        isScrolling: false,
        currentPosition: {
            x: 0,
            y: 0

        },
        to(to) {
            console.log(to)
            if (isRef(to)) {

            }
        },
        toBottom() {
        },
        toTop() {
        }
    })

    const scrollEnd = useDebounceFn(() => {
        scrollTool.isScrolling = false
    }, 100)

    onMounted(() => {
        container.addEventListener('scroll', () => {
            scrollTool.isScrolling = true
            if (container) {
                scrollTool.currentPosition.x = container.scrollLeft
                scrollTool.currentPosition.y = container.scrollTop
            }
            scrollEnd()
        })
    })

    return scrollTool
}