<template>
  <div class="login">
    <h2 class="login__title">Авторизация</h2>
    <form class="login__form" @submit.prevent="handleSubmit">
      <LoginInput
        v-model="username"
        :disabled="isLoading"
        autocomplete="username"
      />
      <PasswordInput
        v-model="password"
        :disabled="isLoading"
        autocomplete="current-password"
      />
      <div v-if="error" class="login__error">{{ error }}</div>
      <BaseButton size="medium" type="submit" :loading="isLoading">
        Войти
      </BaseButton>
    </form>
    <WindowLoader v-if="isLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import LoginInput from '@/features/login/ui/login-input/LoginInput.vue'
import PasswordInput from '@/features/password/ui/password-input/PasswordInput.vue'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'
import WindowLoader from '@/shared/ui/WindowLoader/WindowLoader.vue'

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
      isLoading: false,
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
        this.isLoading = true
        await this.login({
          username: this.username.startsWith('+')
            ? this.username.slice(1)
            : this.username,
          password: this.password
        })
        this.$router.push({ name: 'requests-list' })
      } catch (error) {
        console.error('Ошибка авторизации:', error)
      } finally {
        this.isLoading = false
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
