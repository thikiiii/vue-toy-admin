<script lang="ts" setup>
import { jumpToNewTab } from '@/utils'
import IconHoverContainer from '../IconHoverContainer/index.vue'

defineOptions({ name: 'Github' })

</script>
<template>
  <icon-hover-container content="Github" @click="jumpToNewTab('https://github.com/thikiiii/vue-thik-admin')">
    <icon icon="github"></icon>
  </icon-hover-container>
</template>

<style scoped>

</style>