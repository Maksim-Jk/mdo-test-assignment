<template>
  <div class="app-layout">
    <header class="app-header">
      <h1 class="app-title">{{ title }}</h1>
    </header>
    <main class="app-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'AppLayout',
  computed: {
    title () {
      return this.$route.meta?.title || ''
    }
  }
})
</script>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: $color-surface;
  border-bottom: 1px solid $color-border;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-title {
  color: $color-text-title;
  margin: 0;
  font-size: 1.5rem;
}

.app-content {
  flex: 1;
  padding: 2rem;
}
</style>
