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
import Vue, { PropType, defineComponent } from 'vue'
import { IconName } from './types'

export default defineComponent({
  name: 'BaseIcon',
  props: {
    icon: {
      type: String as PropType<IconName>,
      required: true
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
