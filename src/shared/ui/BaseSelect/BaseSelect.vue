<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBaseSelectOption } from './baseSelect.types'
import BaseInput from '../BaseInput/BaseInput.vue'

export default defineComponent({
  name: 'BaseSelect',
  components: {
    BaseInput
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    placeholder: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<IBaseSelectOption[]>,
      required: true,
      validator: (value: IBaseSelectOption[]) => value.every(item =>
        typeof item === 'object' && 'value' in item && 'label' in item
      )
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    enableServerSearch: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false,
      inputValue: '',
      dropdownPlacement: 'bottom'
    }
  },
  computed: {
    filteredOptions (): IBaseSelectOption[] {
      if (!this.inputValue) return this.options

      const query = this.inputValue.toLowerCase()
      return this.options.filter(option =>
        option.label.toLowerCase().includes(query)
      )
    },
    displayValue (): string {
      return this.inputValue
    },
    selectedOption (): IBaseSelectOption | undefined {
      return this.options.find(option => option.value === this.value)
    }
  },
  methods: {
    handleInput (value: string) {
      this.inputValue = value
      this.isOpen = true

      if (this.enableServerSearch) {
        this.$emit('search', value)
      }

      if (this.value) {
        this.$emit('change', null)
      }
    },
    handleSelect (option: IBaseSelectOption) {
      this.$emit('change', option.value)
      this.inputValue = option.label
      this.isOpen = false
    },
    handleBlur () {
      setTimeout(() => {
        if (!this.selectedOption && this.value === null) {
          this.inputValue = ''
        }
        this.isOpen = false
      }, 200)
    },
    calculateDropdownPosition () {
      const selectEl = this.$el as HTMLElement
      const selectRect = selectEl.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const dropdownHeight = 200

      if (windowHeight - selectRect.bottom < dropdownHeight &&
          selectRect.top > dropdownHeight) {
        this.dropdownPlacement = 'top'
      } else {
        this.dropdownPlacement = 'bottom'
      }
    },
    handleClickOutside (event: MouseEvent) {
      const target = event.target as Node
      if (!this.$el.contains(target)) {
        this.isOpen = false
        if (!this.selectedOption) {
          this.inputValue = ''
        } else {
          this.inputValue = this.selectedOption.label
        }
      }
    }
  },
  watch: {
    selectedOption: {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.inputValue = newVal.label
        } else {
          this.inputValue = ''
        }
      }
    }
  },
  mounted () {
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount () {
    document.removeEventListener('click', this.handleClickOutside)
  }
})
</script>

<template>
  <div class="select-wrapper">
    <div class="select-container">
      <BaseInput
        :value="displayValue"
        :placeholder="placeholder"
        :size="size"
        :disabled="disabled"
        @input="handleInput"
        @blur="handleBlur"
        @focus="calculateDropdownPosition"
      >
        <template #suffix>
          <div :class="['select-arrow', { 'is-open': isOpen }]" />
        </template>
      </BaseInput>

      <div
        v-if="isOpen"
        :class="[
          'options-container',
          `dropdown-${dropdownPlacement}`
        ]"
      >
        <template v-if="loading">
          <div class="loading-container">
            <div class="loading-spinner" />
          </div>
        </template>
        <template v-else-if="filteredOptions.length > 0">
          <div
            v-for="option in filteredOptions"
            :key="option.value"
            class="option"
            @mousedown="handleSelect(option)"
          >
            {{ option.label }}
          </div>
        </template>
        <div v-else class="no-results">
          Ничего не найдено
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-wrapper {
  position: relative;
  width: 100%;
}

.select-container {
  position: relative;
}

.select-arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid $color-text-secondary;
  transition: transform 0.2s ease;

  &.is-open {
    transform: rotate(180deg);
  }
}

.options-container {
  position: absolute;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid $color-border;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  &.dropdown-bottom {
    top: calc(100% + 4px);
  }

  &.dropdown-top {
    bottom: calc(100% + 4px);
  }

  // Стили для Firefox
  scrollbar-width: thin;
  scrollbar-color: $color-accent $color-background;

  // Стили для Chrome/Safari/Edge
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: $color-background;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $color-accent;
    border-radius: 3px;
  }
}

.option {
  padding: 8px;
  cursor: pointer;
  @extend .r14r;

  &:hover {
    background-color: rgba($color-accent, 0.1);
  }
}

.no-results {
  padding: 8px;
  text-align: center;
  color: $color-text-secondary;
  @extend .r14r;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid $color-background;
  border-top: 2px solid $color-accent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container {
  display: flex;
  justify-content: center;
  padding: 16px;
}
</style>
