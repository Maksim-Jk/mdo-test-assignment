/**
 * Генерирует уникальный ключ кэша из переданных аргументов
 * @param args - Любое количество аргументов любого типа
 * @returns Строка, где все аргументы соединены через дефис
 */
export function generateCacheKey (...args: unknown[]): string {
  return args.map(arg =>
    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
  ).join('-')
}
