<template>
  <div id="app">
    <router-view />
    <base-notification />
  </div>
</template>

<script lang="ts">
import { BaseNotification } from '@/shared/ui'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
    BaseNotification
  }
})
</script>
