<template>
  <div class="home">
    <AppealsTable @open-modal="openModal" />
    <BaseModal :is-open="isModalOpen" title="AppealsCreateModal" name="AppealsCreateModal" @close="closeModal">
      <AppealsCreateModal @close="closeModal" />
    </BaseModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppealsTable from '@/widgets/AppealsTable/ui/AppealsTable.vue'
import BaseModal from '@/shared/ui/BaseModal/BaseModal.vue'
import AppealsCreateModal from '@/widgets/appeals-create-modal/ui/AppealsCreateModal.vue'

export default Vue.extend({
  name: 'HomePage',
  components: {
    AppealsTable,
    BaseModal,
    AppealsCreateModal
  },
  data () {
    return {
      isModalOpen: false
    }
  },
  methods: {
    openModal () {
      this.isModalOpen = true
    },
    closeModal () {
      this.isModalOpen = false
    }
  }
})
</script>
