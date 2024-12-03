<template>
    <div class="login">
      <h2 class="login__title">Авторизация</h2>
      <form class="login__form" @submit.prevent="handleSubmit">
        <LoginInput v-model="username" :disabled="isLoading" autocomplete="username" />
        <PasswordInput v-model="password" :disabled="isLoading" autocomplete="current-password" />
        <div v-if="error" class="login__error">{{ error }}</div>
        <BaseButton
            size="medium"
            type="submit"
            :loading="isLoading"
        >
            Войти
        </BaseButton>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import LoginInput from '@/features/login/ui/login-input/LoginInput.vue'
import PasswordInput from '@/features/password/ui/password-input/PasswordInput.vue'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'

export default Vue.extend({
  name: 'LoginForm',
  components: {
    LoginInput,
    PasswordInput,
    BaseButton
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['isLoading', 'error'])
  },
  methods: {
    ...mapActions('auth', ['login']),
    async handleSubmit () {
      try {
        await this.login({
          username: this.username.startsWith('+') ? this.username.slice(1) : this.username,
          password: this.password
        })
        this.$router.push({ name: 'requests-list' })
      } catch (error) {
        console.error('Ошибка авторизации:', error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
    position: relative;
    width: 100vw;
    max-width: 340px;
    background-color: $color-surface;
    padding: 92px 20px 20px;
    border-radius: $size-border-radius;
}

.login__title {
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: $size-border-radius;
    width: 90%;
    padding: 19px;
    background-color: $color-accent;
    color: $color-text-white;
    @extend .i16m;
}

.login__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}

.login__error {
    color: red;
    font-size: 14px;
    text-align: center;
}
</style>
