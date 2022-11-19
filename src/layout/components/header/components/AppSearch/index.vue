<script lang="ts" setup>
import AppSearchModal from './AppSearchModal.vue'
import { ref } from 'vue'
import IconHoverContainer from '../IconHoverContainer/index.vue'

defineOptions({ name: 'AppSearch' })

const visibleModal = ref(false)

</script>

<template>
  <!-- App搜索 -->
  <icon-hover-container content="搜索" @click="visibleModal=true">
    <icon icon="magnify" pointer />
  </icon-hover-container>
  <app-search-modal v-model:visible="visibleModal" />
</template>
