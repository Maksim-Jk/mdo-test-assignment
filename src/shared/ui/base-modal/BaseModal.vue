<template>
  <transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="$emit('close')" :class="overlayClass">
      <FocusLock :disabled="!isOpen" return-focus>
        <div class="modal-content" @click.stop :class="contentClass">
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </FocusLock>
    </div>
  </transition>
</template>

<script>
import { defineComponent } from 'vue'
import FocusLock from 'vue-focus-lock'

export default defineComponent({
  name: 'BaseModal',
  components: {
    FocusLock
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    overlayClass: {
      type: [String, Object, Array],
      default: ''
    },
    contentClass: {
      type: [String, Object, Array],
      default: ''
    }
  },
  watch: {
    isOpen (newValue) {
      if (newValue) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
})
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-height: 90dvh;
  max-width: 740px;
  overflow-y: auto;
  padding: 32px;

  @media (max-width: 1024px) {
    max-width: 90dvw;
  }

  @media (max-width: 624px) {
    border-radius: 0;
    max-height: 100dvh;
    height: 100%;
    max-width: 100dvw;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @extend .r16m;
  margin-bottom: 32px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0 8px;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>
