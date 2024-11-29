<template>
    <div class="login">
      <h2 class="login__title">Авторизация</h2>
      <form class="login__form">
        <LoginInput v-model="login" />
        <BaseInput v-model="password" placeholder="Пароль">
          <template #prefix>
            <BaseIcon icon="lock" />
          </template>
        </BaseInput>
        <BaseButton size="medium">Войти</BaseButton>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoginInput from '@/features/login/ui/LoginInput/LoginInput.vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/ui/BaseIcon/BaseIcon.vue'

export default Vue.extend({
  name: 'LoginForm',
  components: {
    LoginInput,
    BaseInput,
    BaseButton,
    BaseIcon
  },
  data () {
    return {
      login: '',
      password: ''
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
</style>
