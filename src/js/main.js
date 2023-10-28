import BlackjackGame from './BlackJackGame.js';

const playerSelect = document.getElementById('playerSelect');
const startButton = document.getElementById('startButton');
const hitButton=document.getElementById('hitButton')
const standButton=document.getElementById('standButton')

hitButton.disabled=true
standButton.disabled=true

let game = null;

let selectedValue = 0;

playerSelect.addEventListener('change', () => {
  selectedValue = parseInt(playerSelect.value);
  selectedValue = selectedValue > 4 ? 4 : selectedValue;
  selectedValue = selectedValue < 1 ? 1 : selectedValue;
});

startButton.addEventListener('click', () => {
  console.log('startButton');
  if (!game) {
    game = new BlackjackGame(selectedValue || 1);
  }
  startButton.disabled = true;
  game.startGame();
  game.updateUI();
});

