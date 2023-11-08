/**
 * Асинхронная функция для ожидания завершения игры.
 * @param {object} game - Объект игры.
 * @returns {Promise<boolean>} - Промис, который разрешается значением true при завершении игры.
 */
export function waitForEndGame(game) {
  return new Promise((resolve) => {
    /**
     * Функция проверки окончания игры.
     */
    const checkStopped = () => {
      if (game && game.endGame) {
        resolve(true);
      } else {
        setTimeout(checkStopped, 1000); // Проверка каждую секунду (1000 миллисекунд)
      }
    };

    // Вызов для проверки завершения игры
    checkStopped();
  });
}
