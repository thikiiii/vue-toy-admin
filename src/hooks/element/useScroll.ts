import { isRef, onBeforeUnmount, onMounted, reactive, ref, Ref, toRef, unref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

export interface ScrollPosition {
    top: number
    left: number
}

export interface UseScroll {
    // 是否滚动中
    isScrolling: boolean
    
    // 当前滚动位置
    position: ScrollPosition
    
    // 滚动到 指定元素 | 指定位置
    to(to: Ref<HTMLElement | null> | HTMLElement | ScrollPosition, behavior: ScrollBehavior): void
    
    // 滚动到底部
    toBottom(): void
    
    // 滚动到顶部
    toTop(): void
}

// 滚动容器 ref对象 | HTML元素 | id
export const useScroll = (scrollContainer: Ref<HTMLElement | null> | HTMLElement): UseScroll => {
    const container = isRef(scrollContainer) ? scrollContainer : ref(scrollContainer)
    // 滚动到指定元素
    const scrollToElement = (el: HTMLElement) => {
    
    }

    // 滚动到指定位置
    const scrollToPosition = (position: ScrollPosition, behavior?: ScrollBehavior) => {
        container.value?.scrollTo({
            ...position,
            behavior
        })
    }
    
    const scrollTool: UseScroll = reactive({
        isScrolling: false,
        position: {
            top: 0,
            left: 0
        },
        to(to) {
            if (!isRef(to) && !(to instanceof HTMLElement)) scrollToPosition(to)
            if (to instanceof HTMLElement) return scrollToElement(to)
            const el = isRef(to) && unref(to)
            if (el instanceof HTMLElement) scrollToElement(el)
        },
        toBottom() {
        },
        toTop() {
        }
    })
    
    const scrollEnd = useDebounceFn(() => {
        scrollTool.isScrolling = false
    }, 100)
    
    
    const onScroll = () => {
        scrollTool.isScrolling = true
        if (container.value) {
            scrollTool.position.left = container.value?.scrollLeft
            scrollTool.position.top = container.value?.scrollTop
        }
        scrollEnd()
    }
    
    onMounted(() => {
        container.value?.addEventListener('scroll', onScroll)
    })
    onBeforeUnmount(() => {
        container.value?.removeEventListener('scroll', onScroll)
    })
    return scrollTool
}