<template>
  <div class="home">
    <AppealsTable />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppealsTable from '@/widgets/AppealsTable/ui/AppealsTable.vue'

export default Vue.extend({
  name: 'HomePage',
  components: {
    AppealsTable
  }
})
</script>
