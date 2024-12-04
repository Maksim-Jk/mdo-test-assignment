<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLoader',
  props: {
    size: {
      type: Number,
      default: 24
    }
  }
})
</script>

<template>
  <div class="loading-container">
    <div
      class="loading-spinner"
      :style="{
        width: `${size}px`,
        height: `${size}px`,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.loading-spinner {
  width: 12px;
  height: 12px;
  border: 2px solid $color-background;
  border-top: 2px solid $color-accent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 4px;
}
</style>
