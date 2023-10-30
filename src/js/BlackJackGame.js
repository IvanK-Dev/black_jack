import Player from './Player.js';
import { suits } from './assets/suits.js';
import { cardValues } from './assets/cardValues.js';
import { waitUntilPlayerStops } from './helpers/waitUntilPlayerStops.js';
import { playerGenerator } from './helpers/playerGenerator.js';
import { waitUntilPlayerBust } from './helpers/waitUntilPlayerBust.js';
import { buttonsDisableToggle } from './helpers/buttonsDisableToggle.js';
import { dealerOrBotDrawCards } from './helpers/dealerOrBotDrawCards.js';
import BotPlayer from './BotPlayer.js';
import Dealer from './Dealer.js';
import { delay } from './helpers/delay.js';

/**
 * Класс BlackjackGame управляет ходом игры Blackjack.
 */
export default class BlackjackGame {
  /**
   * Конструктор создает объект игры Blackjack.
   * @param {number} playerCount - Количество игроков.
   */
  constructor(playerCount) {
    /** @type {string[]} deck - Колода карт */
    this.deck = [];
    /** @type {Player[]} players - Массив игроков */
    this.players = [];
    /** @type {boolean} endGame - Флаг окончания игры */
    this.endGame = false;
    /** @type {number} playerCount - Количество игроков */
    this.playerCount = playerCount;

    /** @type {string[]} suits - Масти карт  «Червы», «Бубны», «Трёфы», «Пики»*/
    this.suits = suits;
    /** @type {string[]} values - Значения карт */
    this.values = cardValues;

    /** @type {HTMLElement} handElement - Элемент для отображения руки */
    this.handElement = null;
    /** @type {HTMLElement} scoreElement - Элемент для отображения очков */
    this.scoreElement = null;
    /** @type {HTMLElement} status - Элемент для отображения статуса игры */
    this.status = document.getElementById('status');
  }
  /**
   * Создает колоду карт.
   */
  createDeck() {
    for (let suit of this.suits) {
      for (let value of this.values) {
        this.deck.push(`${value}_of_${suit}`);
      }
    }
  }
  /**
   * Перемешивает колоду карт.
   */
  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  /**
   * Устанавливает элементы для отображения руки и очков игрока.
   * @param {string} handElementId - ID элемента для руки.
   * @param {string} scoreElementId - ID элемента для очков.
   */
  startGame() {
    this.deck = [];
    this.createDeck();
    this.shuffleDeck();

    const playersAreaElement = document.getElementById('players-area');

    this.endGame = false;

    this.status.textContent = 'Игра началась.';

    const dealAndCalculateScore = (playersArray) => {
      for (const participant of playersArray) {
        participant.hand = [
          participant.dealCard(this.deck),
          participant.dealCard(this.deck),
        ];
        participant.calculateHand();
      }
    };
    if (this.players.length === 0) {
      for (let i = 0; i < 4; i++) {
        const player = i < this.playerCount ? new Player() : new BotPlayer();
        this.players.push(player);
        playersAreaElement.appendChild(player.createPlayerElement());
      }

      const dealer = new Dealer();
      this.players.push(dealer);

      playersAreaElement.insertAdjacentElement(
        'afterend',
        dealer.createPlayerElement()
      );
    }

    dealAndCalculateScore(this.players);

    this.updateUI();
  }

  /**
   * Основной процесс игры.
   * Проходит по игрокам и управляет ходом игры, включая раздачу карт, проверку их значений и обновление интерфейса.
   * @returns {Promise<void>} Промис, который завершается по окончании игры.
   */
  gameBody = async () => {
    const generator = playerGenerator(this.players);
    for (const player of generator) {
      const playerElement = document.getElementById(
        player instanceof Dealer ? 'dealer-area' : `player-${player.id}-area`
      );
      const playerButtons = playerElement.querySelectorAll(
        `.player-button-list button`
      );
      const playerScoreElement = playerElement.querySelector('[id*="score"]');

      if (player instanceof Dealer || player instanceof BotPlayer) {
        dealerOrBotDrawCards(player, this.deck);
        player.stopped = true;
      }

      if (player.score > 21) {
        player.stopped = true;
      }
      if (!(player instanceof Dealer || player instanceof BotPlayer)) {
        buttonsDisableToggle(playerButtons);
      }
      waitUntilPlayerBust(player);
      await waitUntilPlayerStops(player);

      if (player instanceof Dealer) {
        playerScoreElement.style.visibility = 'visible';
      }

      if (!(player instanceof Dealer || player instanceof BotPlayer)) {
        buttonsDisableToggle(playerButtons);
      }
      await delay(1000);
      player.updatePlayerUI();
    }

    

    this.endGame = true;
  };

  resetGame = () => {
    this.players.forEach((player) => {
      player.hand = [];
      player.score = 0;
      player.stopped = false;

    });
  };

  /**
   * Выдает карту из колоды.
   * @returns {string} - Последняя карта из колоды.
   */
  dealCard = () => this.deck.pop();

  /**
   * Обновляет пользовательский интерфейс.
   */
  updateUI() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].updatePlayerUI();
    }
  }
}
