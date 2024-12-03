type ValidatableValue = string | number | null | undefined | Record<string, any>

export const isEmptyValue = (value: ValidatableValue): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && !value.trim()) return true
  return false
}

export const validateNestedObject = (obj: Record<string, ValidatableValue>): boolean => {
  return Object.entries(obj).every(([_, value]) => {
    // Если значение - вложенный объект
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return validateNestedObject(value)
    }
    // Для примитивных значений
    return !isEmptyValue(value)
  })
}
