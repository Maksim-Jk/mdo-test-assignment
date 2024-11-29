<template>
  <BaseInput
    v-model="inputValue"
    :placeholder="placeholder"
    :error="error"
  >
    <template #prefix>
      <BaseIcon :icon="iconType" />
    </template>
  </BaseInput>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from '../../../../shared/ui/BaseInput/BaseInput.vue'
import BaseIcon from '../../../../shared/ui/BaseIcon/BaseIcon.vue'

export default Vue.extend({
  name: 'LoginInput',
  components: {
    BaseInput,
    BaseIcon
  },
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: 'Логин или Телефон'
    }
  },
  computed: {
    inputValue: {
      get (): string {
        return this.value
      },
      set (value: string) {
        this.$emit('input', value)
      }
    },
    iconType (): string {
      return this.value.startsWith('+') ? 'phone' : 'person'
    },
    error (): string {
      if (!this.value.startsWith('+')) return ''
      return this.validatePhoneNumber(this.value) ? '' : 'Неверный формат номера'
    }
  },
  methods: {
    validatePhoneNumber (phone: string): boolean {
      // Простая валидация: +7 и 10 цифр
      const phoneRegex = /^\+7\d{10}$/
      return phoneRegex.test(phone)
    }
  }
})
</script>
