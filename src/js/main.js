import BlackjackGame from './BlackJackGame.js';

/**
 * @typedef {Object} PlayerObject - Объект игрока.
 * @property {string} id - Идентификатор игрока.
 * @property {string[]} hand - Рука игрока.
 * @property {Function} calculateHand - Функция для вычисления значения руки игрока.
 * @property {Function} setStopped - Функция для установки остановки игрока.
 */

const playerSelectElement = document.getElementById('playerSelect');
const startButtonElement = document.getElementById('startButton');
const playersAreaElement = document.getElementById('players-area');
/**
 * Игровое поле для блэкджека.
 * @type {BlackjackGame | null}
 */
let game = null;
/**
 * Выбранное количество игроков.
 * @type {number}
 */
let selectedValue = 1;

playerSelectElement.addEventListener('change', () => {
  selectedValue = parseInt(playerSelectElement.value);
  selectedValue = selectedValue > 4 ? 4 : selectedValue;
  selectedValue = selectedValue < 1 ? 1 : selectedValue;
});

startButtonElement.addEventListener('click', () => {
  if (!game) {
    game = new BlackjackGame(selectedValue);
  }else{
    game.resetGame()
  }
  startButtonElement.textContent = 'Сброс игры';
  game.startGame();
  game.gameBody();
});

playersAreaElement.addEventListener('click', (evt) => {
  const elementId = evt.target.id;
  const playerId = parseInt(elementId.split('-').at(1), 10);

  const playerObj = game.players.find(({ id }) => {
    return id === playerId;
  });

  switch (elementId) {
    case `player-${playerId}-hitButton`:
      playerObj.hand.push(game.dealCard());
      playerObj.calculateHand();
      break;
    case `player-${playerId}-stopButton`:
      playerObj.setStopped();
      break;
  }
});
