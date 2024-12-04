<template>
  <div class="login">
    <h2 class="login__title">Авторизация</h2>
    <form class="login__form" @submit.prevent="handleSubmit">
      <login-input
        v-model="username"
        :disabled="isLoading"
        autocomplete="username"
      />
      <password-input
        v-model="password"
        :disabled="isLoading"
        autocomplete="current-password"
      />
      <base-button size="medium" type="submit">
        Войти
      </base-button>
    </form>
    <window-loader v-if="isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { ROUTE_NAMES } from '@/app/router'
import { LoginInput, PasswordInput } from '@/features/auth'
import { BaseButton, WindowLoader } from '@/shared/ui'
import { notificationService } from '@/shared/lib'

export default defineComponent({
  name: 'LoginForm',
  components: {
    LoginInput,
    PasswordInput,
    BaseButton,
    WindowLoader
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
          username: this.username.startsWith('+')
            ? this.username.slice(1)
            : this.username,
          password: this.password
        })
        notificationService.success({ message: 'Успешная авторизация' })
        this.$router.push({ name: ROUTE_NAMES.REQUESTS_LIST })
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

  &__title {
    position: absolute;
    text-align: center;
    z-index: 1000;
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

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
}
</style>
