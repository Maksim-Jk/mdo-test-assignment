<template>
  <div class="home">
    <appeals-table />
  </div>
</template>

<script lang="ts">
import { AppealsTable } from '@/widgets/appeals-table'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    AppealsTable
  }
})
</script>
