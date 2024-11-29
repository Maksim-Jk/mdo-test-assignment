<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBaseSelectOption } from './baseSelect.types'

export default defineComponent({
  name: 'BaseSelect',
  props: {
    value: {
      type: [String, Number],
      default: ''
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
    }
  },
  data () {
    return {
      isOpen: false,
      isFocused: false
    }
  },
  computed: {
    hasValue (): boolean {
      return Boolean(this.value)
    },
    selectedOption (): IBaseSelectOption | undefined {
      return this.options.find((option: IBaseSelectOption) => option.value === this.value)
    }
  },
  methods: {
    handleSelect (option: IBaseSelectOption) {
      this.$emit('input', option.value)
      this.isOpen = false
      this.isFocused = true
    },
    handleBlur () {
      setTimeout(() => {
        this.isOpen = false
        this.isFocused = false
      }, 200)
    }
  }
})
</script>

<template>
  <div class="select-wrapper">
    <div
      :class="[
        'select-container',
        `size-${size}`,
        { 'is-disabled': disabled }
      ]"
    >
      <div
        class="select-field"
        @click="isOpen = !isOpen"
      >
        <label
          :class="['select-label', { 'has-value': hasValue }]"
        >
          {{ placeholder }}
        </label>

        <div
          class="base-select"
          :tabindex="disabled ? -1 : 0"
          @blur="handleBlur"
          @focus="isFocused = true"
        >
          {{ selectedOption?.label || '' }}
        </div>

        <div :class="['select-arrow', { 'is-open': isOpen }]" />
      </div>

      <div
        v-if="isOpen"
        class="options-container"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="option"
          @click="handleSelect(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-wrapper {
  position: relative;
  width: 100%;
  border-bottom: 1px solid $color-border;
  margin-top: 6px;
}

.select-container {
  width: 100%;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .base-select {
      cursor: not-allowed;
    }
  }

  &.size-medium {
    .base-select {
      padding: 8px 0;
      min-height: 40px;
      @extend .r14r;
    }
    .select-label {
      @extend .r14r;
      padding: 8px 0;
    }
  }

  &.size-large {
    .base-select {
      padding: 17px 0;
      min-height: 56px;
      @extend .r14r;
    }
    .select-label {
      @extend .r14r;
      padding: 17px 0;
    }
  }
}

.select-field {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.base-select {
  width: 100%;
  outline: none;
  transition: all 0.2s ease;
  color: $color-text-primary;
  text-align: left;
  cursor: pointer;

  &:focus {
    border-color: $color-accent;
  }

  &:disabled {
    background-color: $color-background;
  }
}

.select-label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: $color-text-secondary;
  transition: all 0.2s ease;
  pointer-events: none;

  &.has-value {
    top: 0;
    @extend .r12r;
    color: $color-text-accent;
  }
}

.options-container {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid $color-border;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

.option {
  cursor: pointer;
  @extend .r14r;
  text-align: left;
  border-bottom: 1px solid $color-border;

  .size-medium & {
    padding: 8px;
  }

  .size-large & {
    padding: 17px;
  }

  &:hover {
    background-color: rgba($color-accent, 0.1);
  }
}

.option:last-child {
  border-bottom: none;
}

.select-arrow {
  position: absolute;
  right: 0;
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
</style>
