/**
 * Преобразует дату из ISO формата в формат DD.MM.YYYY
 * @param {string} isoDate - Дата в формате ISO (например, "2024-03-20T10:30:00Z")
 * @returns {string} Дата в формате DD.MM.YYYY (например, "20.03.2024")
 */
export const transformDateFromIso = (isoDate: string): string => {
  if (!isoDate) {
    return ''
  }
  const date = new Date(isoDate)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
