<script lang="ts" setup>
import AppSearchModal from './AppSearchModal.vue'
import { ref } from 'vue'

defineOptions({ name: 'AppSearch' })

const visibleModal = ref(false)

</script>

<template>
  <!-- App搜索 -->
  <icon icon="magnify" pointer @click="visibleModal=true" />
  <app-search-modal v-model:visible="visibleModal" />
</template>
