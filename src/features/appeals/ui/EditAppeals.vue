<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from '@/shared/ui/BaseButton/BaseButton.vue'
import { AppealItemDto } from '@/shared/api/appeals/types'

export default defineComponent({
  name: 'EditAppeals',
  components: {
    BaseButton
  },
  props: {
    appeal: {
      type: Object as () => AppealItemDto,
      required: true
    }
  },
  emits: ['edit']
})
</script>

<template>
  <BaseButton
    size="small"
    @click="$emit('edit', appeal.id)"
  >
    {{ appeal.number }}
  </BaseButton>
</template>

<style scoped lang="scss">
.edit-appeals {
  display: inline-block;
}
</style>
