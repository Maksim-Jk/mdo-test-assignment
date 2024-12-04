/**
 * Преобразует дату из строки в формат DD.MM.YYYY
 * @param {string} dateString - Дата в строковом формате
 * @returns {string} Дата в формате DD.MM.YYYY
 */
export function formatDate (dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}

/**
 * Преобразует дату из строки в формат DD.MM.YYYY HH:MM
 * @param {string} dateString - Дата в строковом формате
 * @returns {string} Дата и время в формате DD.MM.YYYY HH:MM
 */
export function formatDateTime (dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes}`
}
