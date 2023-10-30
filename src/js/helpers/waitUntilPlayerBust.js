/**
 * Ожидание, пока у игрока сумма очков в игре превысит 21 .
 *
 * @param {Object} player - Игрок, у которого происходит проверка.
 * @returns {Promise<void>} Промис, который разрешается, когда игрок превысит 21 очко.
 */
export const waitUntilPlayerBust = (player) => {
  return new Promise((resolve) => {
    const checkStopped = () => {
      if (player.score > 21) {
        player.setStopped();
        resolve();
      } else {
        setTimeout(checkStopped, 100); // Проверка каждые 100 миллисекунд
      }
    };
    checkStopped();
  });
};
