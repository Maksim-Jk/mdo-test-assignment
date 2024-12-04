<template>
  <BaseButton @click="logout" variant="secondary" size="small">Выйти</BaseButton>
  </template>

<script lang="ts">
import store from '@/app/store'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'
import { defineComponent } from 'vue'

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
