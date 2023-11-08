import Dealer from '../Dealer.js';

/**
 * Функция для создания элемента отображения победителей игры.
 * @param {object} game - Объект игры Blackjack.
 * @returns {HTMLDivElement} - HTML-элемент, содержащий информацию о победителях.
 */
export const showWinnersElement = (game) => {
  // Фильтрация игроков с количеством очков <= 21
  let players = game.players.filter((player) => player.score <= 21);

  // Поиск максимального количества очков среди игроков
  const winScore = Math.max(...players.map(({ score }) => score));

  // Фильтрация игроков с количеством очков, равным максимальному
  players = players.filter((player) => player.score === winScore);

  // Создание HTML строки с информацией о победителях
  const winnersHTMLStr = players
    .map((player) => {
      if (player instanceof Dealer) {
        return `<p>Диллер выиграл. Очки: ${player.score} </p>`;
      } else {
        return `<p>Игрок ${player.id} выиграл. Очки: ${player.score} </p>`;
      }
    })
    .join('');
  // Создание HTML-элемента div для отображения информации о победителях
  const winnersElement = document.createElement('div');
  winnersElement.className = 'winners';
  winnersElement.innerHTML = winnersHTMLStr;
  return winnersElement;
};
