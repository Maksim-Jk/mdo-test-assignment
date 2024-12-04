<template>
  <base-input
    :value="search"
    placeholder="Поиск (№ заявки, название)"
    @input="handleInput"
  >
    <template #suffix>
      <base-icon icon="search" />
    </template>
  </base-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BaseIcon, BaseInput } from '@/shared/ui'

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
