<template>
    <div>
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
    </div>
  </template>

<script lang="ts">
import AppealsForm from '@/features/appeals-form/ui/AppealsForm.vue'
import { AppealsService } from '@/shared/api/appeals/appeals.service'
import { AppealItemDto } from '@/shared/api/appeals/types'
import { validateNestedObject } from '@/shared/utils/validation'
import Vue from 'vue'

export default Vue.extend({
  name: 'AppealsCreateModal',
  components: {
    AppealsForm
  },
  props: {
    appealsId: {
      type: String,
      required: true
    }
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
        status: 'Новая',
        status_id: null as number | null
      }
    }
  },
  created () {
    if (this.appealsId) {
      this.fetchAppeals()
    }
  },
  methods: {
    handleSubmit () {
      const isValid = validateNestedObject(this.form)

      if (!isValid) {
        alert('Заполните все поля')
        return
      }

      const payload = {
        ...this.form,
        premise_id: this.form.premise_id!,
        apartment_id: this.form.apartment_id!
      }

      AppealsService.getInstance().createAppeals(payload)
    },
    async fetchAppeals () {
      this.isLoading = true
      try {
        await this.$store.dispatch('appeals/fetchAppealById', this.appealsId)
        const appeals = this.$store.getters['appeals/getAppealById'](this.appealsId) as AppealItemDto
        this.form.premise_id = appeals?.premise?.id || null
        this.form.apartment_id = appeals?.apartment?.id || null
        this.form.applicant = appeals?.applicant
        this.form.description = appeals?.description
        this.form.due_date = appeals?.due_date || ''
        this.form.status_id = appeals?.status?.id
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>

<style scoped lang="scss">
.appeals-create-modal {
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
