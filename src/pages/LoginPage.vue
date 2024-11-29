<template>
  <div>
    <LoginForm />
  </div>
</template>

<script lang="ts">
import LoginForm from '@/widgets/LoginForm/LoginForm.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
  components: {
    LoginForm
  }
})
</script>
