<template>
    <div class="base-select">
      <div class="base-select__container">
        <div
          class="base-select__field"
          :class="[
            `base-select__field--${size}`,
            { 'base-select__field--disabled': disabled }
          ]"
          @click="!disabled && toggleDropdown()"
        >
          <span :class="['base-select__value', { 'is-placeholder': !selectedOption }]">
            {{ selectedOption?.label || placeholder }}
          </span>
          <div :class="['base-select__select-arrow', { 'is-open': isOpen }]" v-if="!loading" />
          <BaseLoader v-if="loading" :size="12" />
        </div>

        <div
          v-if="isOpen"
          :class="[
            'base-select__options-container',
            `dropdown-${dropdownPlacement}`
          ]"
        >
          <template v-if="options.length > 0">
            <div
              v-for="option in options"
              :key="option.value"
              class="base-select__option"
              :class="{ 'is-selected': option.value === value }"
              @mousedown="handleSelect(option)"
            >
              {{ option.label }}
            </div>
          </template>
          <div class="base-select__states" v-else>
            <BaseLoader v-if="loading" />
            <BaseEmpty v-else />
          </div>
        </div>
      </div>
    </div>
  </template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { BaseLoader, BaseEmpty } from '@/shared/ui'
import { IBaseSelectOption } from './baseSelect.types'

export default defineComponent({
  name: 'BaseSelect',
  components: {
    BaseLoader,
    BaseEmpty
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
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpen: false,
      dropdownPlacement: 'bottom'
    }
  },
  computed: {
    selectedOption (): IBaseSelectOption | undefined {
      return this.options.find(option => option.value === this.value)
    }
  },
  methods: {
    toggleDropdown () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.calculateDropdownPosition()
      }
    },
    handleSelect (option: IBaseSelectOption) {
      this.$emit('change', option.value)
      this.isOpen = false
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

  <style scoped lang="scss">
  .base-select {
    position: relative;
    width: 100%;

    &__container {
      position: relative;
    }

    &__field {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: white;
      border-bottom: 1px solid $color-border;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover:not(&--disabled) {
        border-color: $color-accent;
      }

      &--medium {
        height: 40px;
      }

      &--large {
        height: 48px;
      }

      &--disabled {
        background-color: $color-background;
        cursor: not-allowed;
      }
    }

    &__value {
      @extend .r14r;

      &.is-placeholder {
        color: $color-text-secondary;
      }
    }

    &__select-arrow {
      width: 0;
      height: 0;
      border: {
        left: 5px solid transparent;
        right: 5px solid transparent;
        top: 5px solid $color-text-secondary;
      }
      transition: transform 0.2s ease;

      &.is-open {
        transform: rotate(180deg);
      }
    }

    &__options-container {
      $scrollbar-width: 6px;
      $dropdown-offset: 4px;

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
        top: calc(100% + #{$dropdown-offset});
      }

      &.dropdown-top {
        bottom: calc(100% + #{$dropdown-offset});
      }

      scrollbar-width: thin;
      scrollbar-color: $color-accent $color-background;

      &::-webkit-scrollbar {
        width: $scrollbar-width;
      }

      &::-webkit-scrollbar-track {
        background: $color-background;
        border-radius: $scrollbar-width / 2;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $color-accent;
        border-radius: $scrollbar-width / 2;
      }
    }

    &__option {
      padding: 12px 8px;
      text-align: left;
      cursor: pointer;
      @extend .r14r;

      &:hover {
        background-color: rgba($color-accent, 0.1);
      }

      &.is-selected {
        background-color: rgba($color-accent, 0.1);
        color: $color-accent;
      }
    }

    &__states {
      padding: 16px;
      text-align: center;
    }
  }
  </style>
