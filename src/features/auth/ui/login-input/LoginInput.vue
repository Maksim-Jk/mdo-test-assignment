<template>
  <BaseInput
    v-model="inputValue"
    :placeholder="placeholder"
    :error="error"
    :autocomplete="autocomplete"
  >
    <template #prefix>
      <base-icon :icon="iconType" />
    </template>
  </BaseInput>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BaseIcon, BaseInput } from '@/shared/ui'
import { IconName } from '@/shared/ui/base-icon/types'

export default defineComponent({
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
    },
    autocomplete: {
      type: String,
      default: 'username'
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
    iconType (): IconName {
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
