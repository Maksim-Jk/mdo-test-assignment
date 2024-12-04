<template>
  <div class="pagination">
    <div class="pagination__controls">
      <span class="pagination__controls-text">
        <span class="r14b">{{ isNaN((currentPage - 1) * pageSize + 1) ? 0 : (currentPage - 1) * pageSize + 1 }}-{{ isNaN(Math.min(currentPage * pageSize, totalCount)) ? 0 : Math.min(currentPage * pageSize, totalCount) }} </span>
        из
        <span class="r14b">{{ totalCount }}</span> записей
      </span>
      <BaseSelect
        :value="pageSize"
        :options="pageSizeOptions"
        placeholder=""
        @change="onPageSizeChange"
        class="pagination__select"
      />
    </div>

    <div class="pagination__navigation">
      <BaseButton
        circle
        size="small"
        :disabled="currentPage === 1"
        @click="onPageChange(1)"
        variant="unselected"
        class="pagination__button"
      >
        <BaseIcon icon="double-arrow-left" />
      </BaseButton>
      <BaseButton
        circle
        size="small"
        :disabled="currentPage === 1"
        @click="onPageChange(currentPage - 1)"
        variant="unselected"
        class="pagination__button"
      >
        <BaseIcon icon="arrow-left" />
      </BaseButton>

      <div class="pagination__pages">
        <template v-for="page in visiblePages">
          <BaseButton
            v-if="page !== -1"
            :key="page"
            circle
            size="small"
            :variant="page === currentPage ? 'default' : 'unselected'"
            @click="onPageChange(page)"
            class="pagination__button"
          >
            {{ page }}
          </BaseButton>
          <span
            v-else
            :key="'dots-' + page"
            class="pagination__dots"
          >
            ...
          </span>
        </template>
      </div>

      <BaseButton
        circle
        size="small"
        :disabled="!hasNextPage"
        @click="onPageChange(currentPage + 1)"
        variant="unselected"
        class="pagination__button"
      >
        <BaseIcon icon="arrow-left" style="transform: rotate(180deg)" />
      </BaseButton>
      <BaseButton
        circle
        size="small"
        :disabled="currentPage === totalPages"
        @click="onPageChange(totalPages)"
        variant="unselected"
        class="pagination__button"
      >
        <BaseIcon icon="double-arrow-left" style="transform: rotate(180deg)" />
      </BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'
import BaseIcon from '@/shared/ui/BaseIcon/BaseIcon.vue'
import BaseSelect from '@/shared/ui/BaseSelect/BaseSelect.vue'

export default Vue.extend({
  name: 'TablePagination',
  components: {
    BaseButton,
    BaseIcon,
    BaseSelect
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    hasNextPage: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      pageSizeOptions: [
        { value: 10, label: '10' },
        { value: 25, label: '25' },
        { value: 50, label: '50' },
        { value: 100, label: '100' }
      ]
    }
  },
  computed: {
    visiblePages (): number[] {
      const delta = 2
      const range: number[] = []
      const rangeWithDots: number[] = []
      let l: number

      for (let i = 1; i <= this.totalPages; i++) {
        if (
          i === 1 ||
          i === this.totalPages ||
          (i >= this.currentPage - delta && i <= this.currentPage + delta)
        ) {
          range.push(i)
        }
      }

      range.forEach(i => {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1)
          } else if (i - l !== 1) {
            rangeWithDots.push(-1)
          }
        }
        rangeWithDots.push(i)
        l = i
      })

      return rangeWithDots
    }
  },
  methods: {
    onPageChange (page: number) {
      this.$emit('page-change', page)
    },
    onPageSizeChange (value: number) {
      this.$emit('page-size-change', value)
    }
  }
})
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
}

.pagination__select {
  width: 89px;
}

.pagination .base-button.pagination__button {
  @extend .r10r;
  color: $color-text-subtitle;
  box-shadow: none;
}

.pagination .base-button.pagination__button:not(.variant-unselected) {
  color: $color-text-white;
}

.pagination__controls {
  display: flex;
  justify-content: center;
  align-items: baseline;
  gap: 0.5rem;
}

.pagination__controls-text {
  margin-right: 12px;
}

.pagination__navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.pagination__pages {
  display: flex;
  gap: 0.5rem;
}

.pagination__dots {
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  color: $color-text-subtitle;
}
</style>
