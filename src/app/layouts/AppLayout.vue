<template>
  <div class="app-layout">
    <header class="app-header">
      <h1 class="app-title" aria-label="Заголовок страницы">{{ pageTitle }}</h1>
      <LogoutButton />
    </header>
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import LogoutButton from '@/features/auth/ui/logout-button/LogoutButton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppLayout',
  components: {
    LogoutButton
  },
  computed: {
    pageTitle (): string {
      return this.$route.meta?.title ?? ''
    }
  }
})
</script>

<style scoped lang="scss">
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 var(--spacing-md, 16px);
}

.app-header {
  padding: var(--spacing-lg, 24px) var(--spacing-md, 18px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  text-align: left;
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
