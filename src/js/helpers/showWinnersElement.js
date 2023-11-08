import Dealer from '../Dealer.js';

export const showWinnersElement = (game) => {
  let players = game.players.filter((player) => player.score <= 21);
  const winScore = Math.max(...players.map(({ score }) => score));
  players = players.filter((player) => player.score === winScore);
  const winnersElement = players.map((player) => {
    if (player instanceof Dealer) {
      return `<p>Диллер выиграл. Очки: ${player.score} </p>`;
    }
    else {
      return `<p>Игрок ${player.id} выиграл. Очки: ${player.score} </p>`;
    }
  }).join('');
};
