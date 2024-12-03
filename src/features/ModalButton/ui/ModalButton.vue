<template>
  <div>
    <button @click="openModal">Открыть модальное окно</button>
    
    <Modal :is-open="isModalOpen" @close="closeModal">
      <div class="modal-header">
        <h2>Заголовок модального окна</h2>
      </div>
      <div class="modal-body">
        <p>Содержимое модального окна</p>
      </div>
      <div class="modal-footer">
        <button @click="closeModal">Закрыть</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Modal } from '@/shared/ui/Modal'

export default {
  name: 'ModalButton',
  components: {
    Modal
  },
  data() {
    return {
      isModalOpen: false
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    }
  }
}
</script> 