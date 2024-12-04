<template>
  <div class="base-date-time-picker">
    <label
      v-if="label"
      :class="[
        'base-date-time-picker__label',
        { 'has-value': value || isFocused }
      ]"
    >
      {{ label }}
    </label>
    <DatePicker
      :value="value"
      type="datetime"
      format="DD.MM.YYYY HH:mm"
      @input="$emit('input', $event)"
      @focus="handleFocus"
      @blur="handleBlur"
      :disabled="disabled"
      :default-value="value ? new Date(value) : null"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/ru'

export default defineComponent({
  name: 'BaseDateTimePicker',
  components: {
    DatePicker
  },
  props: {
    value: {
      type: [Date, String, null] as PropType<Date | string | null>,
      default: null
    },
    label: {
      type: String,
      default: ''
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
  methods: {
    handleFocus () {
      this.isFocused = true
    },
    handleBlur () {
      this.isFocused = false
    }
  }
})
</script>

<style lang="scss">
.base-date-time-picker {
  position: relative;
  width: 100%;

  &__label {
    position: absolute;
    z-index: 100;
    left: 0;
    top: calc(50% + 5px);
    transform: translateY(calc(-50% - 5px));
    color: $color-text-secondary;
    transition: all 0.2s ease;
    pointer-events: none;
    @extend .r14r;
    line-height: 1;

    &.has-value {
      top: 6px;
      @extend .r14r;
      color: $color-text-accent;
    }
  }
}
</style>
