<template>
  <div class="base-table-widget">
    <table class="base-table">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.key"
            :class="{ 'sortable': header.sortable }"
          >
            <div class="header-content" @click="handleHeaderClick(header)">
              <span>{{ header.title }}</span>
              <span v-if="header.sortable" class="sort-icon"
               :class="{
                    'sort-icon--active': currentOrdering === header.key,
                    'sort-icon--reverse': currentOrdering === header.key && currentOrder === 'asc'
                  }">
                <BaseIcon
                  icon="arrow-up"
                  class="sort-icon-svg"
                />
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseIcon from '../BaseIcon/BaseIcon.vue'

export default defineComponent({
  name: 'BaseTable',
  components: {
    BaseIcon
  },
  props: {
    headers: {
      type: Array as () => Array<{ key: string; title: string; sortable?: boolean }>,
      required: true
    },
    currentOrdering: {
      type: String,
      default: null
    },
    currentOrder: {
      type: String,
      default: null
    }
  },
  methods: {
    handleHeaderClick (header: { key: string, sortable?: boolean }) {
      if (header.sortable) {
        this.$emit('header-click', header.key)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.base-table-widget {
  overflow-x: auto;
}

.base-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.base-table tbody tr th {
  width: 100%;
}

.base-table th,
.base-table td {
  padding: 15px 8px;
  text-align: left;
  border: none;
  border-bottom: 1px solid #ddd;
}

.base-table th {
  color: $color-accent;
  @extend .r14r;

  &.sortable {
    cursor: pointer;
    user-select: none;
  }
}

.base-table td {
  vertical-align: middle;
  @extend .i14r;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-icon {
  display: inline-flex;
  opacity: 0.3;
  transition: opacity 0.2s, transform 0.2s;

  &--active {
    opacity: 1;
  }

  &--reverse {
    transform: rotate(180deg);
  }
}

.sort-icon-svg:deep(svg) rect,
.sort-icon-svg:deep(svg) path {
  fill: #333333;
}
</style>
