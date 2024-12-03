<template>
  <div>
    <div class="appeals-create-modal__header">
      <h3 class="appeals-create-modal__header-title">Создание заявки</h3>
      <span class="appeals-create-modal__header-status">Новая</span>
    </div>
    <form class="appeals-create-modal__form" @submit.prevent="handleSubmit">
      <div class="appeals-create-modal__form-row">
        <DictionarySelect size="large" name="premise" placeholder="Дом" @change="handlePremiseChange" />
        <DictionarySelect size="large" name="apartment" placeholder="Квартира" dependency-key="premise_id" :dependency-value="form.premise_id" @change="handleApartmentChange" />
        <BaseInput size="large" placeholder="Срок" v-model="form.due_date" />
      </div>
      <div class="appeals-create-modal__form-row">
        <BaseInput size="large" placeholder="Фамилия" v-model="form.applicant.last_name" />
        <BaseInput size="large" placeholder="Имя" v-model="form.applicant.first_name" />
        <BaseInput size="large" placeholder="Отчество" v-model="form.applicant.patronymic_name" />
        <BaseInput size="large" placeholder="Телефон" v-model="form.applicant.username" />
      </div>
      <div class="appeals-create-modal__form-row">
        <BaseTextarea size="large" placeholder="Описание заявки" v-model="form.description" />
      </div>
      <div class="appeals-create-modal__form-row  appeals-create-modal__form-actions">
        <BaseButton size="small" variant="secondary" type="button" @click="$emit('close')">Отмена</BaseButton>
        <BaseButton size="small" type="submit">Создать</BaseButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import DictionarySelect from '@/features/dictionary-select/ui/DictionarySelect.vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import BaseTextarea from '@/shared/ui/BaseTextarea/BaseTextarea.vue'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'
import Vue from 'vue'
import { validateNestedObject } from '@/shared/utils/validation'
import { AppealsService } from '@/shared/api/appeals/appeals.service'

export default Vue.extend({
  name: 'AppealsCreateModal',
  data () {
    return {
      form: {
        premise_id: null as number | null,
        apartment_id: null as number | null,
        applicant: {
          last_name: '',
          first_name: '',
          patronymic_name: '',
          username: ''
        },
        description: '',
        due_date: '',
        status: 'новая'
      }
    }
  },
  methods: {
    handlePremiseChange (id: number) {
      this.form.premise_id = id
    },
    handleApartmentChange (id: number) {
      this.form.apartment_id = id
    },
    handleSubmit () {
      const isValid = validateNestedObject(this.form)

      if (!isValid) {
        return alert('Пожалуйста, заполните все поля')
      }

      const payload = {
        ...this.form,
        premise_id: this.form.premise_id!,
        apartment_id: this.form.apartment_id!,
        status_id: 1
      } as const

      AppealsService.getInstance().createAppeals(payload).then((res) => {
        console.log(res)
      })
    }
  },
  components: {
    DictionarySelect,
    BaseInput,
    BaseTextarea,
    BaseButton
  }
})
</script>

<style scoped lang="scss">
.appeals-create-modal {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    &-title {
      @extend .r16m;
    }

    &-status {
      @extend .i14r;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    gap: 32px;

    &-row {
      width: 100%;
      display: flex;
      gap: 16px;
    }

    &-actions {
      justify-content: flex-end;
    }
  }
}
</style>
