import BlackjackGame from './BlackJackGame.js';
import {waitUntilPlayerStops} from './helpers/waitUntilPlayerStops.js'

const playerSelectElement = document.getElementById('playerSelect');
const startButtonElement = document.getElementById('startButton');
const playersAreaElement = document.getElementById('players-area');
// const startAnotherButton= document.getElementById('startAnotherButton')

// startAnotherButton.disabled=true

let game = null;

let selectedValue = 0;

playerSelectElement.addEventListener('change', () => {
  selectedValue = parseInt(playerSelectElement.value);
  selectedValue = selectedValue > 4 ? 4 : selectedValue;
  selectedValue = selectedValue < 1 ? 1 : selectedValue;
});

startButtonElement.addEventListener('click', () => {
  if (!game) {
    game = new BlackjackGame(selectedValue || 1);
  }
  startButtonElement.disabled = true;
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
  game.updateUI();
});
