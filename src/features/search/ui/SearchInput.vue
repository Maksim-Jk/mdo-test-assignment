<template>
  <BaseInput
    :value="search"
    placeholder="Поиск (№ заявки, название)"
    @input="handleInput"
  >
    <template #suffix>
      <BaseIcon icon="search" />
    </template>
  </BaseInput>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseInput from '@/shared/ui/BaseInput/BaseInput.vue'
import BaseIcon from '@/shared/ui/BaseIcon/BaseIcon.vue'

export default defineComponent({
  name: 'SearchInput',
  components: {
    BaseInput,
    BaseIcon
  },
  data () {
    return {
      search: '',
      timeoutId: null as number | null
    }
  },
  props: {
    debounceTimeout: {
      type: Number,
      default: 300
    }
  },
  methods: {
    handleInput (value: string) {
      this.search = value
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
      }
      this.timeoutId = window.setTimeout(() => {
        this.$emit('input', value)
      }, this.debounceTimeout)
    }
  }
})
</script>
