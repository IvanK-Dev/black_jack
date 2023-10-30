/**
 * Функция-генератор для пошаговой выдачи игроков из массива.
 *
 * @param {Array} players - Массив игроков.
 * @yields {*} Следующий игрок из массива.
 */
export const playerGenerator = function* (players) {
  for (let i = 0; i < players.length; i++) {
    yield players[i];
  }
};
