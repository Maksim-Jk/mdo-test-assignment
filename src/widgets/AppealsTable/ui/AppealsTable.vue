<template>
  <div class="appeals-table-widget">
    <table class="appeals-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Создана</th>
          <th>Адрес</th>
          <th>Заявитель</th>
          <th>Описание</th>
          <th>Срок</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="appeal in appeals.results" :key="appeal.id">
          <td class="appeals-table-widget__number">
            <EditAppeals :appeal="appeal" />
          </td>
          <td class="appeals-table-widget__created-at">{{ formatDate(appeal.created_at) }}</td>
          <td class="appeals-table-widget__address">{{ formatAddress(appeal) }}</td>
          <td class="appeals-table-widget__applicant">{{ formatApplicant(appeal.applicant) }}</td>
          <td class="appeals-table-widget__description">{{ appeal.description || 'Без описания' }}</td>
          <td class="appeals-table-widget__due-date">{{ appeal.due_date ? formatDateTime(appeal.due_date) : 'Не указан' }}</td>
          <td class="appeals-table-widget__status">
            <span
              class="status-badge"
              :class="{ 'status-red': appeal.status.is_red_details }"
            >
              {{ appeal.status.name }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button
        :disabled="currentPage === 1"
        @click="onPageChange(currentPage - 1)"
      >
        Назад
      </button>
      <span>
        Страница {{ currentPage }} из {{ appeals.pages }}
        (Всего записей: {{ appeals.count }})
      </span>
      <button
        :disabled="!appeals.page_next"
        @click="onPageChange(currentPage + 1)"
      >
        Вперед
      </button>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import Vue from 'vue'
import { IAppealsResponse, AppealItemDto, Applicant } from '@/shared/api/appeals/types'
import EditAppeals from '@/features/appeals/ui/EditAppeals.vue'

export default Vue.extend({
  name: 'AppealsTable',
  components: {
    EditAppeals
  },
  props: {
    appeals: {
      type: Object as () => IAppealsResponse,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    formatDateTime (dateString: string): string {
      return new Date(dateString).toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    formatDate (dateString: string): string {
      return new Date(dateString).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    },
    formatApplicant (applicant: Applicant): string {
      const { last_name, first_name, patronymic_name } = applicant
      return [last_name, first_name, patronymic_name]
        .filter(Boolean)
        .join(' ')
    },
    formatAddress (appeal: AppealItemDto): string {
      const parts = []

      if (appeal.premise?.full_address) {
        parts.push(appeal.premise.full_address)
      }

      if (appeal.apartment?.number) {
        parts.push(`кв. ${appeal.apartment.number}`)
      }

      return parts.length ? parts.join(', ') : 'Адрес не указан'
    },
    onPageChange (page: number) {
      this.$emit('page-change', page)
    }
  }
})
</script>

<style scoped>
.appeals-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.appeals-table th,
.appeals-table td {
  padding: 15px 8px;
  text-align: left;
  border: none;
  border-bottom: 1px solid #ddd;
}

.appeals-table th {

}

.appeals-table td {
  vertical-align: middle;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #e8e8e8;
  font-size: 0.9em;
}

.status-badge.status-red {
  background-color: #ffebee;
  color: #c62828;
}

.appeals-table-widget__number {
  max-width: 100px;
}

.appeals-table-widget__created-at {
  max-width: 150px;
}

.appeals-table-widget__address {
  max-width: 200px;
}

.appeals-table-widget__applicant {
  max-width: 200px;
}

.appeals-table-widget__description {
  max-width: 260px;
}

.appeals-table-widget__due-date {
  max-width: 150px;
  white-space: nowrap;
}

.appeals-table-widget__status {
  max-width: 150px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.pagination button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: 1px solid #ddd;
  background-color: #fff;
  border-radius: 4px;
}

.pagination button:hover:not(:disabled) {
  background-color: #f5f5f5;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  color: #666;
}
</style>
