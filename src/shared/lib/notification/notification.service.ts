import { ref } from 'vue'
import { INotification, INotificationOptions } from './types'

class NotificationService {
  private notifications = ref<INotification[]>([])

  show (options: INotificationOptions) {
    const notification: INotification = {
      id: Date.now().toString(),
      message: options.message,
      type: options.type,
      duration: options.duration || 3000,
      description: options.description
    }

    this.notifications.value.push(notification)

    setTimeout(() => {
      this.remove(notification.id)
    }, notification.duration)
  }

  remove (id: string) {
    this.notifications.value = this.notifications.value.filter(
      notification => notification.id !== id
    )
  }

  getNotifications () {
    return this.notifications
  }

  success (options: { message: string, duration?: number, description?: string }) {
    this.show({ ...options, type: 'success' })
  }

  warning (options: { message: string, duration?: number, description?: string }) {
    this.show({ ...options, type: 'warning' })
  }

  error (options: { message: string, duration?: number, description?: string }) {
    this.show({ ...options, type: 'error' })
  }
}

export const notificationService = new NotificationService()
