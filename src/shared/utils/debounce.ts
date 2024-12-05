/**
 * Создает функцию, которая откладывает вызов переданной функции на указанное время
 * @param {Function} fn - Функция для вызова
 * @param {number} delay - Задержка в миллисекундах
 */
export function debounce (fn: (query: string) => Promise<void> | void, delay: number) {
  let timeoutId: number

  return function (query: string) {
    window.clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => fn(query), delay)
  }
}
