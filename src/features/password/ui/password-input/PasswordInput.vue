<template>
  <BaseInput
    :type="showPassword ? 'text' : 'password'"
    :value="value"
    :autocomplete="autocomplete"
    placeholder="Пароль"
    @input="$emit('input', $event)"
  >
    <template #prefix>
      <BaseIcon icon="lock" />
    </template>
    <template #suffix>
      <BaseIcon
        icon="eye"
        class="password-input__toggle"
        @click.native="togglePassword"
      />
    </template>
  </BaseInput>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import BaseIcon from '@/shared/ui/BaseIcon/BaseIcon.vue'

export default Vue.extend({
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
