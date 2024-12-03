<template>
  <BaseButton @click="logout" size="small">Выйти</BaseButton>
  </template>

<script lang="ts">
import store from '@/app/store'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'
import Vue from 'vue'

export default Vue.extend({
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
