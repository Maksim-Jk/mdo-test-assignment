export type NotificationType = 'success' | 'warning' | 'error'

export interface INotification {
  id: string
  message: string
  type: NotificationType
  duration?: number
  description?: string
}

export interface INotificationOptions {
  message: string
  type: NotificationType
  duration?: number
  description?: string
}
