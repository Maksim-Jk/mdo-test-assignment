<template>
  <BaseInput
    :type="showPassword ? 'text' : 'password'"
    :value="value"
    :autocomplete="autocomplete"
    placeholder="Пароль"
    @input="$emit('input', $event)"
  >
    <template #prefix>
      <base-icon icon="lock" />
    </template>
    <template #suffix>
      <base-icon
        icon="eye"
        class="password-input__toggle"
        @click.native="togglePassword"
      />
    </template>
  </BaseInput>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BaseIcon, BaseInput } from '@/shared/ui'

export default defineComponent({
  name: 'PasswordInput',
  components: {
    BaseInput,
    BaseIcon
  },
  props: {
    value: {
      type: String,
      required: true
    },
    autocomplete: {
      type: String,
      default: 'current-password'
    }
  },
  data () {
    return {
      showPassword: false
    }
  },
  methods: {
    togglePassword () {
      this.showPassword = !this.showPassword
    }
  }
})
</script>

<style lang="scss" scoped>
.password-input__toggle {
  cursor: pointer;
}
</style>
