<template>
  <div class="appeals-table-widget">
    <div class="appeals-table-widget__header">
      <div class="appeals-table-widget__controls">
        <base-button size="small" @click="openModal('create')">Создать</base-button>
      </div>
      <div class="appeals-table-widget__filters">
        <search-input @input="handleSearch" />
        <dictionary-select
          name="premise"
          placeholder="Дом"
          @change="handlePremiseChange"
        />
      </div>
    </div>
    <base-table
      :headers="tableHeaders"
      @header-click="handleHeaderClick"
      :current-ordering="sortField"
      :current-order="sortOrder"
    >
      <template v-if="isLoading">
        <tr>
          <td
            :colspan="tableHeaders.length"
            class="appeals-table-widget__state"
          >
            <base-loader :size="24" />
          </td>
        </tr>
      </template>
      <template v-else-if="error">
        <tr>
          <td
            :colspan="tableHeaders.length"
            class="appeals-table-widget__state"
          >
            <base-empty title="Ошибка при загрузке обращений" />
          </td>
        </tr>
      </template>
      <template v-else-if="appeals.results.length === 0">
        <tr>
          <td :colspan="tableHeaders.length" class="appeals-table-widget__state">
            <base-empty title="Обращений не найдено" />
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="appeal in appeals.results" :key="appeal.id">
          <td class="appeals-table-widget__number">
            <base-button size="small" @click="openModal('edit', appeal.id)">{{ appeal.number }}</base-button>
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
    </base-table>

    <table-pagination
      v-if="!isLoading && !error"
      :current-page="currentPage"
      :page-size="pageSize"
      :total-pages="appeals.pages"
      :total-count="appeals.count"
      :has-next-page="!!appeals.page_next"
      @page-change="handlePageChange"
      @page-size-change="handlePageSizeChange"
    />

    <base-modal :is-open="modal.isModalOpen && modal.modalName === 'create'" title="AppealsCreateModal" name="AppealsCreateModal" @close="closeModal">
      <appeals-create-modal @close="closeModal" @created="createAppeal" />
    </base-modal>

    <base-modal v-if="modal.appealId" :is-open="modal.isModalOpen && modal.modalName === 'edit'" title="AppealsEditModal" name="AppealsEditModal" @close="closeModal">
      <appeals-edit-modal :appeals-id="modal.appealId" @close="closeModal" @updated="updateAppeal" />
    </base-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SearchInput, TablePagination } from '@/features/appeals-table'
import { DictionarySelect } from '@/features/dictionaries'
import { formatApplicant, formatAddress } from '../../model/appeals'
import {
  TABLE_HEADERS,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
  DEFAULT_SORT_FIELD,
  DEFAULT_PAGE
} from '../../model/constants'
import { BaseTable, BaseButton, BaseModal, BaseEmpty, BaseLoader } from '@/shared/ui'
import { AppealsCreateModal } from '@/widgets/appeals-create-modal'
import { AppealsEditModal } from '@/widgets/appeals-edit-modal'
import { formatDate, formatDateTime } from '@/shared/utils'

export default defineComponent({
  name: 'AppealsTable',
  components: {
    TablePagination,
    BaseTable,
    SearchInput,
    DictionarySelect,
    BaseButton,
    AppealsCreateModal,
    AppealsEditModal,
    BaseModal,
    BaseEmpty,
    BaseLoader
  },
  data () {
    return {
      modal: {
        isModalOpen: false,
        modalName: '',
        appealId: null as string | null
      },
      currentPage: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      sortField: DEFAULT_SORT_FIELD,
      sortOrder: DEFAULT_SORT_ORDER,
      search: '',
      premise_id: '',
      tableHeaders: TABLE_HEADERS
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
    async fetchAppeals ({ forceUpdate = false }: { forceUpdate?: boolean } = {}) {
      const ordering =
        this.sortOrder === 'asc' ? this.sortField : `-${this.sortField}`
      await this.$store.dispatch('appeals/fetchAppeals', {
        page: this.currentPage,
        page_size: this.pageSize,
        ordering: ordering,
        search: this.search,
        premise_id: this.premise_id,
        forceUpdate
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
    },
    openModal (name: string, id?: string) {
      this.modal.isModalOpen = true
      this.modal.modalName = name
      this.modal.appealId = id || null
    },
    closeModal () {
      this.modal.isModalOpen = false
    },
    createAppeal () {
      this.closeModal()
      this.fetchAppeals({ forceUpdate: true })
    },
    updateAppeal () {
      this.closeModal()
      this.fetchAppeals({ forceUpdate: true })
    },
    formatDateTime,
    formatDate,
    formatApplicant,
    formatAddress
  }
})
</script>

<style scoped lang="scss">
.appeals-table-widget {
  &__header {
    display: flex;
    flex-direction: column;
    gap: 32px;
    margin-bottom: 32px;
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
  }

  &__filters {
    @media (max-width: 624px) {
      flex-wrap: wrap;
    }
  }

  &__filters {
    display: flex;
    gap: 16px;
  }

  &__number { width: 100px; }
  &__created-at { width: 150px; }
  &__address { width: 200px; }
  &__applicant { width: 200px; }
  &__description { width: 260px; }

  &__due-date {
    width: 150px;
    white-space: nowrap;
  }

  &__status { width: 150px; }

  &__state {
    text-align: center;
    padding: 2rem !important;
  }
}

.appeals-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;

  th,
  td {
    padding: 15px 8px;
    text-align: left;
    border: none;
    border-bottom: 1px solid #ddd;
  }

  th {
    color: $color-accent;
    @extend .r14r;
  }

  td {
    vertical-align: middle;
    @extend .i14r;
  }
}
</style>
