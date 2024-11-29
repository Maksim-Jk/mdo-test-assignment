<template>
  <div class="home">
    <h2>Список заявок</h2>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">Ошибка при загрузке обращений</div>
    <div v-else>
      <AppealsTable
        :appeals="appeals"
        :current-page="currentPage"
        @page-change="changePage"
      />
    </div>
  </div>
</template>

<script lang="ts">
import AppealsTable from '@/widgets/AppealsTable/ui/AppealsTable.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'HomePage',
  components: {
    AppealsTable
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters['appeals/isLoading']
    },
    error () {
      return this.$store.getters['appeals/error']
    },
    appeals () {
      return this.$store.getters['appeals/appeals']
    }
  },
  methods: {
    async changePage (page: number) {
      this.currentPage = page
      await this.$store.dispatch('appeals/fetchAppeals', { page })
    }
  },
  async mounted () {
    await this.$store.dispatch('appeals/fetchAppeals', { page: 1 })
  }
})
</script>
