<template>
  <div class="appeals-table-widget">
    <div class="appeals-table-widget__header">
      <div class="appeals-table-widget__controls">
        <BaseButton size="small" @click="$emit('open-modal')">test</BaseButton>
      </div>
      <div class="appeals-table-widget__filters">
        <SearchInput @input="handleSearch" />
        <DictionarySelect
          name="premise"
          placeholder="Дом"
          @change="handlePremiseChange"
        />
      </div>
    </div>
    <BaseTable
      :headers="tableHeaders"
      @header-click="handleHeaderClick"
      :current-ordering="sortField"
      :current-order="sortOrder"
    >
      <template v-if="isLoading">
        <tr>
          <td
            :colspan="tableHeaders.length"
            class="appeals-table-widget__loading"
          >
            Загрузка...
          </td>
        </tr>
      </template>
      <template v-else-if="error">
        <tr>
          <td
            :colspan="tableHeaders.length"
            class="appeals-table-widget__error"
          >
            Ошибка при загрузке обращений
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="appeal in appeals.results" :key="appeal.id">
          <td class="appeals-table-widget__number">
            <EditAppeals :appeal="appeal" />
          </td>
          <td class="appeals-table-widget__created-at">
            {{ formatDate(appeal.created_at) }}
          </td>
          <td class="appeals-table-widget__address">
            {{ formatAddress(appeal) }}
          </td>
          <td class="appeals-table-widget__applicant">
            {{ formatApplicant(appeal.applicant) }}
          </td>
          <td class="appeals-table-widget__description">
            {{ appeal.description || "Без описания" }}
          </td>
          <td class="appeals-table-widget__due-date">
            {{
              appeal.due_date ? formatDateTime(appeal.due_date) : "Не указан"
            }}
          </td>
          <td class="appeals-table-widget__status">
            {{ appeal.status.name }}
          </td>
        </tr>
      </template>
    </BaseTable>

    <TablePagination
      v-if="!isLoading && !error"
      :current-page="currentPage"
      :page-size="pageSize"
      :total-pages="appeals.pages"
      :total-count="appeals.count"
      :has-next-page="!!appeals.page_next"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
    />
  </div>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import Vue from 'vue'
import { AppealItemDto, Applicant } from '@/shared/api/appeals/types'
import EditAppeals from '@/features/appeals/ui/EditAppeals.vue'
import TablePagination from '@/features/table-pagination/ui/TablePagination.vue'
import BaseTable from '@/shared/ui/BaseTable/BaseTable.vue'
import SearchInput from '@/features/search/ui/SearchInput.vue'
import DictionarySelect from '@/features/dictionary-select/ui/DictionarySelect.vue'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'

export default Vue.extend({
  name: 'AppealsTable',
  components: {
    EditAppeals,
    TablePagination,
    BaseTable,
    SearchInput,
    DictionarySelect,
    BaseButton
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 10,
      sortField: '',
      sortOrder: 'asc',
      search: '',
      premise_id: '',
      tableHeaders: [
        { key: 'number', title: '№', sortable: true },
        { key: 'created_at', title: 'Создана', sortable: true },
        { key: 'address', title: 'Адрес' },
        { key: 'applicant', title: 'Заявитель' },
        { key: 'description', title: 'Описание' },
        { key: 'due_date', title: 'Срок' },
        { key: 'status', title: 'Статус', sortable: true }
      ]
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters['appeals/isLoading']
    },
    error () {
      return this.$store.getters['appeals/error']
    },
    appeals () {
      return this.$store.getters['appeals/appeals']
    }
  },
  created () {
    this.fetchAppeals()
  },
  watch: {
    currentPage: {
      handler () {
        this.fetchAppeals()
      }
    },
    pageSize: {
      handler () {
        this.fetchAppeals()
      }
    },
    sortField: {
      handler () {
        this.fetchAppeals()
      }
    },
    sortOrder: {
      handler () {
        this.fetchAppeals()
      }
    },
    search: {
      handler () {
        this.currentPage = 1
        this.fetchAppeals()
      }
    },
    premise_id: {
      handler () {
        this.fetchAppeals()
      }
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
      return [last_name, first_name, patronymic_name].filter(Boolean).join(' ')
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
    async fetchAppeals () {
      const ordering =
        this.sortOrder === 'asc' ? this.sortField : `-${this.sortField}`
      await this.$store.dispatch('appeals/fetchAppeals', {
        page: this.currentPage,
        page_size: this.pageSize,
        ordering: ordering,
        search: this.search,
        premise_id: this.premise_id
      })
    },
    handlePageChange (page: number) {
      this.currentPage = page
    },
    handlePageSizeChange (size: number) {
      console.log('size', size)

      this.pageSize = size
      this.currentPage = 1
    },
    handleHeaderClick (key: string) {
      if (this.sortField === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = key
        this.sortOrder = 'asc'
      }

      this.currentPage = 1
    },
    handleSearch (value: string) {
      this.search = value
    },
    handlePremiseChange (value: string) {
      this.premise_id = value
    }
  }
})
</script>

<style scoped lang="scss">
.appeals-table-widget__header {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-bottom: 32px;
}

.appeals-table-widget__controls {
  display: flex;
  justify-content: flex-end;
}

.appeals-table-widget__filters {
  display: flex;
  gap: 16px;
}

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
  color: $color-accent;
  @extend .r14r;
}

.appeals-table td {
  vertical-align: middle;
  @extend .i14r;
}

.appeals-table-widget__number {
  width: 100px;
}

.appeals-table-widget__created-at {
  width: 150px;
}

.appeals-table-widget__address {
  width: 200px;
}

.appeals-table-widget__applicant {
  width: 200px;
}

.appeals-table-widget__description {
  width: 260px;
}

.appeals-table-widget__due-date {
  width: 150px;
  white-space: nowrap;
}

.appeals-table-widget__status {
  width: 150px;
}

.appeals-table-widget__loading,
.appeals-table-widget__error {
  text-align: center;
  padding: 2rem !important;
}

.appeals-table-widget__error {
  color: red;
}
</style>
