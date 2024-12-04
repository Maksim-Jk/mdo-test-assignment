<template>
  <div class="home">
    <AppealsTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppealsTable from '@/widgets/AppealsTable/ui/AppealsTable.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    AppealsTable
  }
})
</script>
