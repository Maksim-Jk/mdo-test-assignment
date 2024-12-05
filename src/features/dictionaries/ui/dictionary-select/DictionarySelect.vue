<template>
  <BaseAutocomplete
    :options="options"
    :value="localValue"
    @change="handleChange"
    @search="onSearch"
    :placeholder="placeholder"
    :enable-server-search="true"
    :loading="isLoading"
    :disabled="disabled || isDisabled"
    :size="size"
  />
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'
import { DictionaryResponseType, DictionaryTypes } from '../../api'
import { BaseAutocomplete } from '@/shared/ui'
import { debounce } from '@/shared/utils'

export default defineComponent({
  name: 'DictionarySelect',
  components: {
    BaseAutocomplete
  },
  props: {
    name: {
      type: String as PropType<DictionaryTypes>,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    dependencyKey: {
      type: String,
      default: null
    },
    dependencyValue: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    },
    size: {
      type: String,
      default: 'medium'
    },
    value: {
      type: [String, Number] as PropType<string | number | null>,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localValue: this.value ?? undefined,
      items: [] as DictionaryResponseType[DictionaryTypes][],
      isLoading: false,
      debouncedSearch: null as unknown as ReturnType<typeof debounce>
    }
  },
  created () {
    this.debouncedSearch = debounce(this.handleSearch, 300)
  },
  computed: {
    options (): { value: string | number; label: string }[] {
      return this.items.map((item: DictionaryResponseType[DictionaryTypes]) => {
        const label = 'address' in item ? item.address : 'number' in item ? item.number : ''
        return ({
          value: item.id,
          label: label
        })
      })
    },
    isDisabled (): boolean {
      if (!this.dependencyKey) return false
      return (
        this.dependencyValue === null || this.dependencyValue === undefined
      )
    }
  },
  methods: {
    handleChange (value: string | number) {
      this.localValue = value
      this.$emit('change', value)
    },

    onSearch (query: string) {
      this.debouncedSearch(query)
    },

    async handleSearch (query: string) {
      try {
        this.isLoading = true
        const params: Record<string, string> = { search: query }

        if (this.dependencyValue != null && this.dependencyKey) {
          params[this.dependencyKey] = this.dependencyValue.toString()
        }

        this.items = await this.$store.getters['dictionaries/getByName'](
          this.name,
          this.$store.dispatch,
          params
        )
      } finally {
        this.isLoading = false
      }
    }
  },
  watch: {
    value (newValue) {
      this.localValue = newValue
    }
  }
})
</script>
