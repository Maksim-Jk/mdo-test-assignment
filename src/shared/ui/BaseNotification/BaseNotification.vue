<template>
  <div class="notifications">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="[`notification--${notification.type}`]"
        @click="removeNotification(notification.id)"
      >
        <span class="notification__message">{{ notification.message }}</span>
        <span class="notification__description">{{ notification.description }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { notificationService } from '@/shared/lib/notification/notification.service'

export default defineComponent({
  name: 'BaseNotification',

  data () {
    return {
      notifications: notificationService.getNotifications()
    }
  },

  methods: {
    removeNotification (id: string) {
      notificationService.remove(id)
    }
  }
})
</script>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  top: 20px;
  right: 40px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
}

.notification {
  text-align: left;
  padding: 12px 24px;
  border-radius: $size-border-radius;
  background-color: $color-surface;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  min-width: 280px;
  max-width: 320px;
  margin-bottom: 10px;

  &--success {
    background-color: rgba($color-notification-success, 0.7);
  }

  &--warning {
    background-color: rgba($color-notification-warning, 0.7);
  }

  &--error {
    background-color: rgba($color-notification-error, 0.7);
  }

  &:has(.notification__description) > &__message {
    margin-bottom: 4px;
  }

  &__message {
    @extend .r14m;
    display: block;
    color: $color-text-white;
  }

  &__description {
    @extend .i12r;
    display: block;
    color: $color-text-white;
  }
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
