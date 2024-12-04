<template>
  <div>
    <login-form />
  </div>
</template>

<script lang="ts">
import { LoginForm } from '@/widgets/login-form'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm
  }
})
</script>
