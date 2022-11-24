<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({ name: 'DashboardAnalysis' })
const ref1 = ref(0)

</script>

<template>
  <div class="test">
    <div class="test">
      <button @click="ref1++">test</button>
      <p>{{ ref1 }}</p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.test {
  width: 300px;
  height: 300px;
  background: #0065cc;

  p {
    background: @mainBackgroundColor;
  }
}
</style>