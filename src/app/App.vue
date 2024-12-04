<template>
  <div id="app">
    <router-view />
    <BaseNotification />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseNotification from '@/shared/ui/BaseNotification/BaseNotification.vue'
export default defineComponent({
  name: 'App',
  components: {
    BaseNotification
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
