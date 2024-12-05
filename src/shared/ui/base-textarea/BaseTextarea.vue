<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseTextarea',
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
      const target = event.target as HTMLTextAreaElement
      this.$emit('input', target.value)
    },
    handleBlur () {
      this.isFocused = false
    }
  }
})
</script>

<template>
  <div class="textarea-wrapper">
    <div
      :class="[
        'textarea-container',
        `size-${size}`,
        { 'is-disabled': disabled }
      ]"
    >
      <div class="textarea-field">
        <label
          :class="['textarea-label', { 'has-value': hasValue }]"
        >
          {{ placeholder }}
        </label>

        <textarea
          :value="value"
          :disabled="disabled"
          class="base-textarea"
          @input="handleInput"
          @focus="isFocused = true"
          @blur="handleBlur"
          v-bind="$attrs"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.textarea-wrapper {
  position: relative;
  width: 100%;
  border-bottom: 1px solid $color-border;
  margin-top: 6px;

  &:has(.base-textarea:focus) {
    border-color: $color-accent;
  }
}

.textarea-container {
  width: 100%;

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .base-textarea {
      cursor: not-allowed;
    }
  }

  &.size-medium {
    .base-textarea {
      min-height: 80px;
      padding: 8px 0;
      @extend .r14r;
    }
    .textarea-label {
      @extend .r14r;
    }
  }

  &.size-large {
    .base-textarea {
      min-height: 120px;
      padding: 17px 0;
      @extend .r14r;
    }
    .textarea-label {
      @extend .r14r;

      &.has-value {
        top: 0px;
      }
    }
  }
}

.textarea-field {
  position: relative;
  width: 100%;
}

.base-textarea {
  width: 100%;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;
  color: $color-text-primary;
  border: none;

  &:disabled {
    background-color: $color-background;
  }
}

.textarea-label {
  position: absolute;
  left: 0;
  top: 24px;
  transform: translateY(-50%);
  color: $color-text-secondary;
  transition: all 0.2s ease;
  pointer-events: none;

  &.has-value {
    top: -12px;
    @extend .r12r;
    color: $color-text-accent;
  }
}
</style>
