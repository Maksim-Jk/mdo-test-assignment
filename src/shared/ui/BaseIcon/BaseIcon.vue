<template>
  <span class="base-icon">
    <svgicon
      :name="icon"
      class="base-icon__svg"
      :width="size"
      :height="size"
      :original="true"
    />
  </span>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IconName, ICON_NAMES } from './types'

export default Vue.extend({
  name: 'BaseIcon',
  props: {
    icon: {
      type: String as PropType<IconName>,
      required: true,
      validator: (value: string): boolean => {
        return ICON_NAMES.includes(value as IconName)
      }
    },
    size: {
      type: [Number, String],
      default: 18
    }
  }
})
</script>

<style lang="scss" scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &__svg {
    display: block;
    color: #757575;
    fill: currentColor;
  }
}
</style>
