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
import { debounce } from '@/shared/utils/debounce'

export default defineComponent({
  name: 'SearchInput',
  components: {
    BaseInput,
    BaseIcon
  },
  data () {
    return {
      search: '',
      debouncedEmit: null as unknown as (value: string) => void
    }
  },
  props: {
    debounceTimeout: {
      type: Number,
      default: 300
    }
  },
  created () {
    this.debouncedEmit = debounce((value: string) => {
      this.$emit('input', value)
    }, this.debounceTimeout)
  },
  methods: {
    handleInput (value: string) {
      this.search = value
      this.debouncedEmit(value)
    }
  }
})
</script>
