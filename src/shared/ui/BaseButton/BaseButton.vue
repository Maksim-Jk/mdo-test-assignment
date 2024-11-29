<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseButton',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value: string) => ['default', 'unselected'].includes(value)
    }
  }
})
</script>

<template>
  <button
    :class="[
      'base-button',
      `size-${size}`,
      `variant-${variant}`,
      { 'circle': circle }
    ]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  border: none;
  border-radius: $size-border-radius-small;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: $color-accent;
  color: $color-text-white;
  width: fit-content;
  box-shadow: 0 4px 4px 0 rgba(106, 174, 94, 0.25);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.size-small {
    padding: 8px 16px;
    @extend .r14r;
  }

  &.size-medium {
    padding: 12px 36px;
    @extend .r16r;
  }

  &.size-large {
    padding: 16px 32px;
    @extend .r20r;
  }

  &:hover:not(:disabled) {
    opacity: 0.8;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &.circle {
    border-radius: 50%;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &.size-small {
      width: 32px;
      height: 32px;
    }

    &.size-medium {
      width: 44px;
      height: 44px;
    }

    &.size-large {
      width: 56px;
      height: 56px;
    }
  }

  &.variant-default {
    background-color: $color-accent;
    color: $color-text-white;
  }

  &.variant-unselected {
    background-color: transparent;
    color: $color-text-primary;

    &:hover:not(:disabled) {
      background-color: rgba($color-accent, 0.1);
      opacity: 1;
    }
  }
}
</style>
