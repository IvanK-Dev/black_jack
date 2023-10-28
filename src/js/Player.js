import { handCards,addButtons } from './helpers/helpers.js';

/**
 * Класс Player представляет игрока в игре Blackjack.
 */
export default class Player {
  static #id = 0;
  constructor() {
    Player.#id++;
    this.id = Player.#id;
    this.hand = [];
    this.score = 0;
    this.isDealer = false;
  }

  createPlayerElement = () => {
    const playerElement = document.createElement('div');
    playerElement.id = `player${this.id}-area`;
    playerElement.classList = 'area';
    const title = document.createElement('h2');
    title.textContent = `Игрок ${this.id}`;

    const handElement = document.createElement('div');
    handElement.id = `player${this.id}-hand`;
    handElement.classList = 'hand';

    const scoreElement = document.createElement('p');
    scoreElement.id = `player${this.id}-score`;
    scoreElement.classList = 'score';

    const buttonsListElement=addButtons(this.id)



    playerElement.append(title)
    playerElement.append(handElement)
    playerElement.append(scoreElement)
    playerElement.append(buttonsListElement)

    return playerElement
  };

  /**
   * Метод раздачи карты игроку.
   * @param {string[]} deck - Колода карт.
   * @returns {string} - Возвращает последнюю карту из колоды.
   */
  dealCard=(deck)=> {
    return deck.pop();
  }

  /**
   * Метод вычисления очков на руке игрока.
   * @param {string[]} hand - Рука игрока.
   * @returns {number} - Возвращает сумму очков на руке.
   */
  calculateHand=(hand)=> {
    let score = 0;
    let hasAce = false;

    for (let card of hand) {
      const value = card.split(' ')[0];
      switch (value) {
        case 'Ace':
          hasAce = true;
          score += 11;
          break;
        case 'King':
        case 'Queen':
        case 'Jack':
          score += 10;
          break;
        default:
          score += parseInt(value, 10);
          break;
      }
    }

    if (hasAce && score > 21) {
      score -= 10;
    }

    return score;
  }

  updatePlayerUI = () => {
    const handElement = document.getElementById(`player${this.id}-hand`);
    const scoreElement = document.getElementById(`player${this.id}-score`);
    const handDealerElement = document.getElementById(`dealer-hand`);
    const scoreDealerElement = document.getElementById(`dealer-score`);

    const cardsList = handCards(this.hand);

    const fillHandAndScore = (handEl, scoreEl) => {
      handEl.appendChild(cardsList);
      scoreEl.textContent = 'Очки: ' + this.score;
    };

    if (this.isDealer === true) {
      if (handDealerElement && scoreDealerElement) {
        fillHandAndScore(handDealerElement, scoreDealerElement);
      }
    } else {
      if (handElement && scoreElement) {
        fillHandAndScore(handElement, scoreElement);
      }
    }
  };
}
