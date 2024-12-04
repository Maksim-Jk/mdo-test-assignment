<template>
    <div class="appeals-edit-modal">
      <div class="appeals-edit-modal__header">
        <h3 class="appeals-edit-modal__header-title">Заявка № {{ form.number }} (от {{ transformDateFromIso(form.created_at) }})</h3>
        <span class="appeals-edit-modal__header-status">{{ status_name }}</span>
      </div>
      <AppealsForm
        :modelValue="form"
        @update:modelValue="form = $event"
        submit-button-text="Сохранить"
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
import { AppealItemDto } from '@/shared/api/appeals/types'
import { transformDateFromIso } from '@/shared/utils/dateTransform'
import { validateNestedObject } from '@/shared/utils/validation'
import Vue from 'vue'
import WindowLoader from '@/shared/ui/WindowLoader/WindowLoader.vue'
export default Vue.extend({
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
        due_date: ''
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
          alert('Заполните все поля')
          return
        }

        const payload = {
          ...this.form,
          premise_id: this.form.premise_id!,
          apartment_id: this.form.apartment_id!,
          number: this.form.number!
        }

        const response = await AppealsService.getInstance().updateAppeal(this.appealsId, payload)
        if (response.status === 200) {
          this.$emit('updated')
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
        this.form.due_date = appeals?.due_date || ''
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
