<script lang="ts">
import { defineComponent } from 'vue'
import { BaseLoader } from '@/shared/ui'

export default defineComponent({
  name: 'WindowLoader',
  components: {
    BaseLoader
  },
  props: {
    size: {
      type: Number,
      default: 48
    }
  }
})
</script>

<template>
  <div class="window-loader-wrapper">
    <div class="window-loader">
      <base-loader :size="size" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.window-loader-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(1px);
  z-index: 900;
}

.window-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
