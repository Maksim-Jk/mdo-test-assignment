<template>
  <form class="appeals-form" @submit.prevent="$emit('submit')">
    <div class="appeals-form__row">
      <DictionarySelect
        size="large"
        name="premise"
        placeholder="Дом"
        :value="modelValue.premise_id"
        @change="handlePremiseChange"
        :disabled="disabled"
      />
      <DictionarySelect
        size="large"
        name="apartment"
        placeholder="Квартира"
        :value="modelValue.apartment_id"
        dependency-key="premise_id"
        :dependency-value="modelValue.premise_id"
        @change="handleApartmentChange"
        :disabled="disabled"
      />
      <BaseInput
        size="large"
        placeholder="Срок"
        :value="modelValue.due_date"
        @input="$emit('update:modelValue', { ...modelValue, due_date: $event })"
        :disabled="disabled"
      />
    </div>
    <div class="appeals-form__row">
      <BaseInput
        size="large"
        placeholder="Фамилия"
        :value="modelValue.applicant.last_name"
        @input="$emit('update:modelValue', { ...modelValue, applicant: { ...modelValue.applicant, last_name: $event } })"
        :disabled="disabled"
      />
      <BaseInput
        size="large"
        placeholder="Имя"
        :value="modelValue.applicant.first_name"
        @input="$emit('update:modelValue', { ...modelValue, applicant: { ...modelValue.applicant, first_name: $event } })"
        :disabled="disabled"
      />
      <BaseInput
        size="large"
        placeholder="Отчество"
        :value="modelValue.applicant.patronymic_name"
        @input="$emit('update:modelValue', { ...modelValue, applicant: { ...modelValue.applicant, patronymic_name: $event } })"
        :disabled="disabled"
      />
      <BaseInput
        size="large"
        placeholder="Телефон"
        :value="modelValue.applicant.username"
        @input="$emit('update:modelValue', { ...modelValue, applicant: { ...modelValue.applicant, username: $event } })"
        :disabled="disabled"
      />
    </div>
    <div class="appeals-form__row">
      <BaseTextarea
        size="large"
        placeholder="Описание заявки"
        :value="modelValue.description"
        @input="$emit('update:modelValue', { ...modelValue, description: $event })"
        :disabled="disabled"
      />
    </div>
    <div class="appeals-form__row appeals-form__actions">
      <BaseButton
        size="small"
        variant="secondary"
        type="button"
        @click="$emit('cancel')"
      >
        {{ cancelButtonText }}
      </BaseButton>
      <BaseButton size="small" type="submit" :disabled="disabled">
        {{ submitButtonText }}
      </BaseButton>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DictionarySelect from '@/features/dictionary-select/ui/DictionarySelect.vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import BaseTextarea from '@/shared/ui/BaseTextarea/BaseTextarea.vue'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'
import { ICreateAppeal } from '@/shared/api/appeals/types'

export default defineComponent({
  name: 'AppealsForm',
  components: {
    DictionarySelect,
    BaseInput,
    BaseTextarea,
    BaseButton
  },
  props: {
    modelValue: {
      type: Object as () => ICreateAppeal,
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
  }

  &__actions {
    justify-content: flex-end;
  }
}
</style>
