<template>
  <form class="appeals-form" @submit.prevent="$emit('submit')">
    <div class="appeals-form__row">
      <dictionary-select
        size="large"
        name="premise"
        placeholder="Дом"
        :value="modelValue.premise_id"
        @change="handlePremiseChange"
        :disabled="disabled"
      />
      <dictionary-select
        size="large"
        name="apartment"
        placeholder="Квартира"
        :value="modelValue.apartment_id"
        dependency-key="premise_id"
        :dependency-value="modelValue.premise_id"
        @change="handleApartmentChange"
        :disabled="disabled"
      />
      <base-date-time-picker
        :value="modelValue.due_date"
        @input="handleDueDateChange"
        :disabled="disabled"
        label="Срок"
      />
    </div>
    <div class="appeals-form__row">
      <base-input
        size="large"
        placeholder="Фамилия"
        :value="modelValue.applicant?.last_name"
        @input="
          $emit('update:modelValue', {
            ...modelValue,
            applicant: { ...modelValue.applicant, last_name: $event },
          })
        "
        :disabled="disabled"
      />
      <base-input
        size="large"
        placeholder="Имя"
        :value="modelValue.applicant?.first_name"
        @input="
          $emit('update:modelValue', {
            ...modelValue,
            applicant: { ...modelValue.applicant, first_name: $event },
          })
        "
        :disabled="disabled"
      />
      <base-input
        size="large"
        placeholder="Отчество"
        :value="modelValue.applicant?.patronymic_name"
        @input="
          $emit('update:modelValue', {
            ...modelValue,
            applicant: { ...modelValue.applicant, patronymic_name: $event },
          })
        "
        :disabled="disabled"
      />
      <base-input
        size="large"
        placeholder="Телефон"
        :value="modelValue.applicant?.username"
        @input="
          $emit('update:modelValue', {
            ...modelValue,
            applicant: { ...modelValue.applicant, username: $event },
          })
        "
        :disabled="disabled"
      />
    </div>
    <div class="appeals-form__row">
      <base-textarea
        size="large"
        placeholder="Описание заявки"
        :value="modelValue.description"
        @input="
          $emit('update:modelValue', { ...modelValue, description: $event })
        "
        :disabled="disabled"
      />
    </div>
    <div class="appeals-form__row appeals-form__actions">
      <base-button
        size="small"
        variant="secondary"
        type="button"
        @click="$emit('cancel')"
      >
        {{ cancelButtonText }}
      </base-button>
      <base-button size="small" type="submit" :disabled="disabled">
        {{ submitButtonText }}
      </base-button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DictionarySelect } from '@/features/dictionaries'
import { BaseButton, BaseDateTimePicker, BaseInput, BaseTextarea } from '@/shared/ui'
import { IAppeal } from '@/shared/api/appeals'

export default defineComponent({
  name: 'AppealsForm',
  components: {
    DictionarySelect,
    BaseInput,
    BaseTextarea,
    BaseButton,
    BaseDateTimePicker
  },
  props: {
    modelValue: {
      type: Object as () => IAppeal,
      required: true
    },
    submitButtonText: {
      type: String,
      default: 'Сохранить'
    },
    cancelButtonText: {
      type: String,
      default: 'Отмена'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handlePremiseChange (id: number) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        premise_id: id,
        apartment_id: null
      })
    },
    handleApartmentChange (id: number) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        apartment_id: id
      })
    },
    handleDueDateChange (value: string) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        due_date: value
      })
    }
  }
})
</script>

<style scoped lang="scss">
.appeals-form {
  display: flex;
  flex-direction: column;
  gap: 32px;

  &__row {
    width: 100%;
    display: flex;
    gap: 16px;

    &.appeals-form__actions {
      justify-content: flex-end;
    }

    @media (max-width: 624px) {
      flex-wrap: wrap;
    }
  }
}
</style>
