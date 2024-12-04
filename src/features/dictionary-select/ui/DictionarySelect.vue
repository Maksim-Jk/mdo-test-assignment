<template>
    <BaseSelect
      :options="options"
    :value="localValue"
    @change="handleChange"
    @search="handleSearch"
    :placeholder="placeholder"
    :enable-server-search="true"
    :loading="isLoading"
    :disabled="disabled || isDisabled"
    :size="size"
    />
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from 'vue'
import BaseSelect from '@/shared/ui/BaseSelect/BaseSelect.vue'

import {
  DictionaryResponseType,
  DictionaryTypes
} from '@/shared/api/dictionaries/dictionaries.service'

export default defineComponent({
  name: 'DictionarySelect',
  components: {
    BaseSelect
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
      type: [String, Number],
      default: null
    },
    size: {
      type: String,
      default: 'medium'
    },
    value: {
      type: [String, Number],
      default: undefined
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      localValue: this.value,
      items: [] as DictionaryResponseType[DictionaryTypes][],
      isLoading: false
    }
  },
  computed: {
    options (): { value: string | number; label: string }[] {
      return this.items.map((item: Record<string, any>) => ({
        value: item.id,
        label: item.address || item.number || item.label || ''
      }))
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
