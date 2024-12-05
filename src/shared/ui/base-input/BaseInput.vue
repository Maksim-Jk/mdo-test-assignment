<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      required: true
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
      isFocused: false
    }
  },
  computed: {
    hasValue (): boolean {
      return Boolean(this.value || this.isFocused)
    }
  },
  methods: {
    handleInput (event: Event) {
      const target = event.target as HTMLInputElement
      this.$emit('input', target.value)
    },
    handleBlur () {
      this.isFocused = false
    }
  }
})
</script>

<template>
  <div class="input-wrapper">
    <div
      :class="[
        'input-container',
        `size-${size}`,
        { 'is-disabled': disabled }
      ]"
    >
      <slot name="prefix"></slot>

      <div class="input-field">
        <label
      :class="['input-label', { 'has-value': hasValue }]"
        >
          {{ placeholder }}
        </label>

        <input
          :value="value"
          :disabled="disabled"
          class="base-input"
          @input="handleInput"
          @focus="isFocused = true"
        @blur="handleBlur"
        v-bind="$attrs"
        />
      </div>

      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;
  border-bottom: 1px solid $color-border;
  margin-top: 6px;

  &:has(.base-input:focus) {
    border-color: $color-accent;
  }
}

.input-container {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .base-input {
      cursor: not-allowed;
    }
  }

  &.size-medium {
    .base-input {
      padding: 8px 0;
      @extend .r14r;
    }
    .input-label {
      @extend .r14r;
    }
  }

  &.size-large {
    .base-input {
      padding: 10px 0;
      @extend .r14r;
    }
    .input-label {
      @extend .r14r;

      &.has-value {
        top: 0px;
      }
    }
  }
}

.input-field {
  position: relative;
  flex-grow: 1;
}

.base-input {
  width: 100%;
  outline: none;
  transition: all 0.2s ease;
  color: $color-text-primary;

  &:disabled {
    background-color: $color-background;
  }
}

.input-label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: $color-text-secondary;
  transition: all 0.2s ease;
  pointer-events: none;
  text-align: left;

  &.has-value {
    top: -12px;
    @extend .r12r;
    color: $color-text-accent;
  }
}
</style>
