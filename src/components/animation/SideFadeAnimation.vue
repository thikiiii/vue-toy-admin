<script lang="ts" setup>
import { TransitionProps } from 'vue'
import gsap from 'gsap'

interface Props extends Omit<TransitionProps, 'name'> {
  // 开始偏移量
  startOffset?: string[]
  // 结束偏移量
  endOffset:string|number[]
}

const props = defineProps<Props>()
console.log(props)
const onBeforeEnter = (el: Element) => {
    gsap.set(el, { opacity: 0, transform: `translate(${ props?.startOffset.join(',') })` })
}

const onEnter = (el: Element, done) => {
    gsap.to(el, {
        transform: `translate(${ props.endOffset.join(',') })`,
        ease: 'elastic.inOut(2.5, 1)',
        onComplete: done
    })
}

function onLeave(el, done) {
    console.log(el)
    gsap.to(el, {
        duration: 0.7,
        scaleX: 1,
        scaleY: 1,
        x: 300,
        ease: 'elastic.inOut(2.5, 1)'
    })
    gsap.to(el, {
        duration: 0.2,
        delay: 0.5,
        opacity: 0,
        onComplete: done
    })
}

</script>

<template>
  <transition :css="false" @leave="onLeave" @enter="onEnter" @before-enter="onBeforeEnter" v-bind="props">
    <slot/>
  </transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: ease-in-out;
}

.slide-fade-leave-active {
  transition: cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate();
  opacity: 0;
}
</style>
