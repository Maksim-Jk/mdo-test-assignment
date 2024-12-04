type ValidatableValue = string | number | null | undefined | object

export const isEmptyValue = (value: ValidatableValue): boolean => {
  if (value === null || value === undefined) return true
  if (typeof value === 'string' && !value.trim()) return true
  return false
}

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
