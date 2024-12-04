<template>
    <div class="appeals-create-modal">
      <div class="appeals-create-modal__header">
        <h3 class="appeals-create-modal__header-title">Создание заявки</h3>
        <span class="appeals-create-modal__header-status">Новая</span>
      </div>
      <AppealsForm
        :modelValue="form"
        @update:modelValue="form = $event"
        submit-button-text="Создать"
        @submit="handleSubmit"
        @cancel="$emit('close')"
        :disabled="isLoading"
      />
      <WindowLoader v-if="isLoading" />
    </div>
  </template>

<script lang="ts">
import AppealsForm from '@/features/appeals-form/ui/AppealsForm.vue'
import { AppealsService } from '@/shared/api/appeals/appeals.service'
import { validateNestedObject } from '@/shared/utils/validation'
import Vue from 'vue'
import WindowLoader from '@/shared/ui/WindowLoader/WindowLoader.vue'
export default Vue.extend({
  name: 'AppealsCreateModal',
  components: {
    AppealsForm,
    WindowLoader
  },
  data () {
    return {
      isLoading: false,
      form: {
        premise_id: null as string | null,
        apartment_id: null as number | null,
        applicant: {
          last_name: '',
          first_name: '',
          patronymic_name: '',
          username: ''
        },
        description: '',
        due_date: '',
        status_id: 1
      }
    }
  },
  methods: {
    async handleSubmit () {
      try {
        this.isLoading = true
        const isValid = validateNestedObject(this.form)

        if (!isValid) {
          alert('Заполните все поля')
          return
        }

        const payload = {
          ...this.form,
          premise_id: this.form.premise_id!,
          apartment_id: this.form.apartment_id!,
          status_id: 1
        }

        const response = await AppealsService.getInstance().createAppeal(payload)
        if (response.status === 201) {
          this.$emit('created')
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped lang="scss">
.appeals-create-modal {
  position: relative;

  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  &__header-title {
    @extend .r16m;
  }

  &__header-status {
    @extend .i14r;
  }
}
</style>
