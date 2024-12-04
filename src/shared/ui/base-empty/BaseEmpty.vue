<template>
  <div class="base-empty">
    <div class="base-empty__icon">
      <slot name="icon">
        <BaseIcon icon="box" class="base-empty__default-icon" :size="32" />
      </slot>
    </div>

    <div class="base-empty__title">
      {{ title }}
    </div>

    <div v-if="description" class="base-empty__description">
      {{ description }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BaseIcon from '../base-icon/BaseIcon.vue'

export default defineComponent({
  name: 'BaseEmpty',
  components: {
    BaseIcon
  },
  props: {
    title: {
      type: String,
      default: 'Ничего не найдено'
    },
    description: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
.base-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__icon {
    margin-bottom: 8px;
  }

  &__title {
    @extend .r14r;
    color: $color-text-secondary;
    margin-bottom: 8px;
  }

  &__description {
    @extend .r12r;
    color: $color-text-secondary;
    margin-bottom: 16px;
  }
}
</style>
