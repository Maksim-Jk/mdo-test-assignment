<template>
  <BaseButton @click="logout" variant="secondary" size="small">Выйти</BaseButton>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BaseButton } from '@/shared/ui'
import store from '@/app/store'

export default defineComponent({
  name: 'LogoutButton',
  components: {
    BaseButton
  },
  methods: {
    logout () {
      store.dispatch('auth/logout')
    }
  }
})
</script>
