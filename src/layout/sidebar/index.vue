<script lang="ts" setup>
import { useLayoutStore } from '@/store/modules/layout'
import SideMode from './sideMode/index.vue'
import MixSideMode from './mixSideMode/index.vue'
import MobileSidebar from './mobileSidebar/index.vue'
import { computed } from 'vue'
import { useToggle } from '@vueuse/core'

defineOptions({ name: 'LayoutSidebar' })
const layoutStore = useLayoutStore()
const { sidebar, app, mobile } = layoutStore.$state
const [ isHidden ] = useToggle()

const className = computed(() => {
    const classList: string[] = []
    switch (app.layoutMode) {
        case 'Side':
            sidebar.isCollapsedSidebar && classList.push('collapsed')
            break
        case 'MixSide':
            sidebar.isFixedMixedSidebar ? classList.push(sidebar.isCollapsedMixedSidebar ? 'mixSideCollapsedFixedWidth' : 'mixSideFixedWidth') : classList.push(sidebar.isCollapsedMixedSidebar ? 'collapsedMixSide' : 'mixSide')
            break
    }
    if (layoutStore.sideInverted) classList.push('inverted')
    return classList.join(' ')
})
</script>

<template>
    <transition name="slideIn">
        <div
            v-if="app.layoutMode !== 'Top' && !mobile.isMobile"
            :class="className"
            :style="{ overflow: isHidden ? 'hidden' : undefined }"
            class="layoutSidebar"
        >
            <transition-group
                name="full"
                @after-leave="isHidden = false"
                @before-enter="isHidden = true"
            >
                <side-mode v-if="app.layoutMode === 'Side'" />
                <mix-side-mode v-if="app.layoutMode === 'MixSide'" />
            </transition-group>
        </div>
    </transition>
    <mobile-sidebar v-if="mobile.isMobile" />
</template>

<style lang="less" scoped>
.layoutSidebar {
  background: @subBackgroundColor;
  transition: 0.2s ease-in-out;
  position: relative;
  color: @mainTextColor;
  width: @sidebarWidth;

  &.inverted {
    background: @invertBackgroundColor;
    color: @invertTextColor;
  }

  &.collapsed {
    width: @collapsedSidebarWidth;
  }

  &.mixSide {
    width: @mixedSidebarWidth;
  }

  &.collapsedMixSide {
    width: @collapsedMixedSidebarWidth;
  }

  &.mixSideFixedWidth {
    width: calc(@mixedSidebarWidth + @sidebarWidth);
  }

  &.mixSideCollapsedFixedWidth {
    width: calc(@collapsedMixedSidebarWidth + @sidebarWidth);
  }
}

.slideIn-enter-active,
.slideIn-leave-active {
  transition: 0.2s ease-in-out;
  overflow: hidden;
}

.slideIn-enter-from,
.slideIn-leave-to {
  width: 0 !important;
}

.full-enter-active,
.full-leave-active {
  transition: 0.3s ease;
  position: absolute;
}

.full-enter-from,
.full-leave-to {
  width: 100%;
  opacity: 0;
  transform: scale(0.9) skew(30deg);
}
</style>
