import BlackjackGame from './BlackJackGame.js';
import ModalWindow from './ModalWindow.js';
import { createPlayerSelectorElement } from './helpers/createPlayerSelectorElement.js';

// const startButtonElement = document.getElementById('startButton');
const playersAreaElement = document.getElementById('players-area');
/**
 * Игровое поле для блэкджека.
 * @type {BlackjackGame | null}
 */
let game = null;

const modal = new ModalWindow();
//открываю модальное окно
modal.openModal(createPlayerSelectorElement(), 'Начать игру', () =>
  handleGameStart()
);


//Получаем ссылки на элементы DOM.
const playerSelectElement = document.getElementById('playerSelect');
/**
 * Выбранное количество игроков.
 * @type {number}
 */
let selectedValue = 1;

// Слушатель события изменения значения в поле выбора количества игроков.
playerSelectElement.addEventListener('change', () => {
  // Обновление выбранного значения, ограниченного диапазоном от 1 до 4 игроков.
  selectedValue = parseInt(playerSelectElement.value);
  selectedValue = selectedValue > 4 ? 4 : selectedValue;
  selectedValue = selectedValue < 1 ? 1 : selectedValue;
});

function handleGameStart() {
  {
    if (!game) {
      game = new BlackjackGame(selectedValue);
    } else {
      game.resetGame();
    }
    game.startGame();
    game.gameBody();
  }
}

// Слушатель события клика в области игрока.
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
      playerObj.updatePlayerUI();
      break;
    case `player-${playerId}-stopButton`:
      playerObj.setStopped();
      break;
  }
});


