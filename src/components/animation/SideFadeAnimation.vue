<script lang="ts" setup>
import { TransitionProps } from 'vue'
import { animate } from 'motion'

interface Props extends Omit<TransitionProps, 'name'> {
  // 开始偏移量
   startOffset?: (string|number)[]

  // 结束偏移量
  endOffset?: (string|number)[]
}

const props = withDefaults(defineProps<Props>(), {
    startOffset: ()=>[ '-20px','-20px' ],
    endOffset: ()=>[ '0', 0 ]
})


const onBeforeEnter = () => {
    // gsap.set(el,{ transform: `translate(${props.startOffset.join(',')})` })
}

const onEnter = (el: Element, done) => {
    const animationControls = animate(el,{ transform: [ `translate(${props.startOffset.join(',')})`,`translate(${props.endOffset.join(',')})` ] },{ duration: 2 })
    animationControls.finished.finally(done)
}

async function onLeave(el, done) {
    const animationControls = animate(el,{ transform: [ `translate(${props.startOffset.join(',')})` ] },{ duration: 2 })
    animationControls.finished.finally(done)
}

</script>

<template>
   <transition  :css="false"  @enter="onEnter" @leave="onLeave" @before-enter="onBeforeEnter">
     <slot />
   </transition>
</template>

<style scoped>

</style>
