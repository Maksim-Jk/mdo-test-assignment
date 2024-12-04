<template>
  <div>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import LoginForm from '@/widgets/LoginForm/LoginForm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm
  }
})
</script>
