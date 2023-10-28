import Player from './Player.js';
import { suits } from './assets/suits.js';
import { cardValues } from './assets/cardValues.js';

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
    /** @type {boolean} isDone - Флаг окончания игры */
    this.isDone = false;
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
        this.deck.push(`${value} of ${suit}`);
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
    this.players = [];
    this.createDeck();
    this.shuffleDeck();

    const playersAreaElement = document.getElementById('players-area');

    this.isDone = false;

    console.log('this.playerCount', this.playerCount);
    this.status.textContent = 'Игра началась.';

    const dealAndCalculateScore = (playersArray) => {
      for (const participant of playersArray) {
        participant.hand = [
          participant.dealCard(this.deck),
          participant.dealCard(this.deck),
        ];
        participant.score = participant.calculateHand(participant.hand);
      }
    };

    for (let i = 0; i < this.playerCount; i++) {
      const player = new Player();
      this.players.push(player);
      playersAreaElement.appendChild(player.createPlayerElement())

    }

    const dealer = new Player();
    dealer.isDealer = true;
    this.players.push(dealer);

    console.log('players', this.players);

    dealAndCalculateScore(this.players);
  }

  /**
   * Выдает карту из колоды.
   * @returns {string} - Последняя карта из колоды.
   */
  dealCard() {
    return this.deck.pop();
  }

  /**
   * Обновляет пользовательский интерфейс.
   */
  updateUI() {
    console.log('updateUI');
    for (let i = 0; i <= this.playerCount; i++) {
      console.log('let i', i);
      console.log('this.players[i]', this.players[i]);
      this.players[i].updatePlayerUI();
    }
  }
}

class some {
  calculateHand(hand) {
    let score = 0;
    let hasAce = false;

    for (let card of hand) {
      const value = card.split(' ')[0];
      if (value === 'Ace') {
        hasAce = true;
        score += 11;
      } else if (['King', 'Queen', 'Jack'].includes(value)) {
        score += 10;
      } else {
        score += parseInt(value, 10);
      }
    }

    if (hasAce && score > 21) {
      score -= 10;
    }

    return score;
  }

  /**
   * Выдает карту игроку.
   */
  playerHit() {
    if (this.isPlayer && !this.isDone) {
      this.hands[0].push(this.dealCard());
      this.scores[0] = this.calculateHand(this.hands[0]);
      this.updateUI();

      if (this.scores[0] > 21) {
        this.isDone = true;
        this.endGame(false);
      }
    }
  }

  /**
   * Завершает ход игрока.
   */
  endPlayerTurn() {
    if (!this.isDone) {
      this.isPlayer = false;
      this.dealerTurn();
    }
  }

  /**
   * Ход дилера.
   */
  dealerTurn() {
    if (!this.isPlayer && !this.isDone) {
      for (let i = 1; i < this.playerCount; i++) {
        while (this.scores[i] < 17) {
          this.hands[i].push(this.dealCard());
          this.scores[i] = this.calculateHand(this.hands[i]);
        }
      }

      this.isDone = true;
      this.updateUI();

      let playerWin = false;
      if (this.scores[0] > 21) {
        playerWin = false;
      } else {
        for (let i = 1; i < this.playerCount; i++) {
          if (
            this.scores[i] <= 21 &&
            (this.scores[i] > this.scores[0] || this.scores[0] > 21)
          ) {
            playerWin = false;
          }
        }
      }

      this.endGame(playerWin);
    }
  }

  /**
   * Завершает игру и объявляет результат.
   * @param {boolean} playerWins - Определяет, выиграл ли игрок.
   */
  endGame(playerWins) {
    this.isDone = true;
    if (playerWins) {
      this.status.textContent = 'Вы выиграли!';
    } else {
      this.status.textContent = 'Дилер выиграл.';
    }
  }

  /**
   * Обновляет пользовательский интерфейс.
   */
  updateUI() {
    for (let i = 0; i < this.playerCount; i++) {
      const handElement = document.getElementById(`player${i + 1}-hand`);
      const scoreElement = document.getElementById(`player${i + 1}-score`);

      if (handElement && scoreElement) {
        handElement.innerHTML = this.hands[i]
          .map((card) => `<span>${card}</span>`)
          .join('');
        scoreElement.textContent = 'Очки: ' + this.scores[i];
      }
    }
  }
}
