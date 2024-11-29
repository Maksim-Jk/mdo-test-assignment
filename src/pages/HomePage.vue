<template>
  <div class="home">
    <h2>Список заявок</h2>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">Ошибка при загрузке обращений</div>
    <div v-else>
      <div v-for="appeal in appeals.results" :key="appeal.id">
        {{ appeal?.description || 'Без названия' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HomePage',
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
  async mounted () {
    this.$store.dispatch('appeals/fetchAppeals')
    console.log(this.appeals)
  }
})
</script>
