<template>
    <div class="appeals-edit-modal">
      <div class="appeals-edit-modal__header">
        <h3 class="appeals-edit-modal__header-title">Заявка № {{ form.number }} (от {{ transformDateFromIso(form.created_at) }})</h3>
        <span class="appeals-edit-modal__header-status">{{ status_name }}</span>
      </div>
      <appeals-form
        :modelValue="form"
        @update:modelValue="form = $event"
        submit-button-text="Сохранить"
        @submit="handleSubmit"
        @cancel="$emit('close')"
        :disabled="isLoading"
      />
      <window-loader v-if="isLoading" />
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue'
import { WindowLoader } from '@/shared/ui'
import { transformDateFromIso, validateNestedObject } from '@/shared/utils'
import { notificationService } from '@/shared/lib'
import { AppealItemDto, AppealsService } from '@/shared/api'
import { AppealsForm } from '@/features/appeals-form'
export default defineComponent({
  name: 'AppealsEditModal',
  components: {
    AppealsForm,
    WindowLoader
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
      status_name: '',
      form: {
        premise_id: null as string | null,
        apartment_id: null as number | null,
        number: null as number | null,
        created_at: '',
        applicant: {
          last_name: '',
          first_name: '',
          patronymic_name: '',
          username: ''
        },
        description: '',
        due_date: '' as string | Date
      }
    }
  },
  created () {
    if (this.appealsId) {
      this.fetchAppeals()
    }
  },
  methods: {
    async handleSubmit () {
      try {
        this.isLoading = true
        const isValid = validateNestedObject(this.form)

        if (!isValid) {
          notificationService.error({ message: 'Ошибка!', description: 'Заполните все поля' })
          return
        }

        const payload = {
          ...this.form,
          premise_id: this.form.premise_id ?? '',
          apartment_id: this.form.apartment_id ?? 0,
          number: this.form.number ?? 0,
          due_date: new Date(this.form.due_date).toISOString()
        }

        const response = await AppealsService.getInstance().updateAppeal(this.appealsId, payload)
        if (response.status === 200) {
          this.$emit('updated')
          notificationService.success({ message: 'Успешно!', description: 'Заявка успешно обновлена' })
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchAppeals () {
      this.isLoading = true
      try {
        await this.$store.dispatch('appeals/fetchAppealById', this.appealsId)
        const appeals = this.$store.getters['appeals/getAppealById'](this.appealsId) as AppealItemDto
        this.form.premise_id = appeals?.premise?.id || null
        this.form.apartment_id = appeals?.apartment?.id || null
        this.form.applicant = {
          last_name: appeals?.applicant?.last_name || '',
          first_name: appeals?.applicant?.first_name || '',
          patronymic_name: appeals?.applicant?.patronymic_name || '',
          username: appeals?.applicant?.username || ''
        }
        this.form.description = appeals?.description
        this.form.due_date = appeals?.due_date ? new Date(appeals.due_date) : ''
        this.form.number = appeals?.number
        this.form.created_at = appeals?.created_at
        this.status_name = appeals?.status?.name
      } finally {
        this.isLoading = false
      }
    },
    transformDateFromIso
  }
})
</script>

<style scoped lang="scss">
.appeals-edit-modal {
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
