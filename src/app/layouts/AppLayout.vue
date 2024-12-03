<template>
  <div class="app-layout">
    <header class="app-header">
      <h1 class="app-title">{{ title }}</h1>
      <LogoutButton />
    </header>
    <main class="app-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LogoutButton from '@/features/logout-button/LogoutButton.vue'

export default Vue.extend({
  name: 'AppLayout',
  components: {
    LogoutButton
  },
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
  padding: 0 16px;
  background-color: $page-background;
}

.app-header {
  padding: 24px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  color: $color-text-title;
  @extend .r20r;
}

.app-content {
  flex: 1;
  padding: 10px 20px;
  background-color: $color-surface;
  border-radius: $size-border-radius;
}
</style>
