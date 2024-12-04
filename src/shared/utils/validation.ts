/**
 * Тип, представляющий значение, которое может быть проверено на пустоту.
 */
type ValidatableValue = string | number | null | undefined | object

/**
 * Проверяет, является ли значение пустым.
 * @param {ValidatableValue} value - Значение для проверки.
 * @returns {boolean} - Возвращает true, если значение пустое, иначе false.
 */
export const isEmptyValue = (value: ValidatableValue): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && !value.trim()) return true
  return false
}

/**
 * Проверяет, является ли вложенный объект валидным (не содержит пустых значений).
 * @param {Record<string, ValidatableValue>} obj - Объект для проверки.
 * @returns {boolean} - Возвращает true, если объект валиден, иначе false.
 */
export const validateNestedObject = (obj: Record<string, ValidatableValue>): boolean => {
  return Object.entries(obj).every(([, value]) => {
    // Если значение - вложенный объект
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return validateNestedObject(value as Record<string, ValidatableValue>)
    }
    // Для примитивных значений
    return !isEmptyValue(value)
  })
}
