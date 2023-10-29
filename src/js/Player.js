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
    this.isBotPlayer = false;
    this.stopped = false;
  }

  createPlayerElement = () => {
    const playerElement = document.createElement('div');
    playerElement.id =`player-${this.id}-area`;
    playerElement.classList = 'area';
    const title = document.createElement('h2');
    title.textContent =`Игрок ${this.id}`;

    const handElement = document.createElement('div');
    handElement.id =`player-${this.id}-hand`;
    handElement.classList = 'hand';

    const scoreElement = document.createElement('p');
    scoreElement.id=`player-${this.id}-score`;
    scoreElement.classList = 'score';

    playerElement.append(title);
    playerElement.append(handElement);
    playerElement.append(scoreElement);

    if (!this.isDealer && !this.isBotPlayer) {
      const buttonsListElement = this.buttonsElement(this.id);
      playerElement.append(buttonsListElement);
    }

    return playerElement;
  };

  handCardsElement = (cards) => {
    const list = document.createElement('ul');

    cards.forEach((card) => {
      const listItem = document.createElement('li');
      listItem.textContent = card;
      list.append(listItem);
    });
    return list;
  };

  buttonsElement = (playerId) => {
    const buttonsInfo = [
      { text: 'Взять', id: `player-${playerId}-hitButton` },
      { text: 'Стоп', id: `player-${playerId}-stopButton` },
    ];

    const type = 'button';

    const buttonList = document.createElement('ul');
    buttonList.classList = 'player-button-list';

    buttonsInfo.forEach(({ text, id }) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.id = id;
      button.disabled = true;

      const listItem = document.createElement('li');
      listItem.append(button);
      buttonList.append(listItem);
    });

    return buttonList;
  };

  setStopped = () => (this.stopped = true);

  /**
   * Метод раздачи карты игроку.
   * @param {string[]} deck - Колода карт.
   * @returns {string} - Возвращает последнюю карту из колоды.
   */
  dealCard = (deck) => deck.pop();

  /**
   * Метод вычисления очков на руке игрока.
   * @param {string[]} hand - Рука игрока.
   * @returns {number} - Возвращает сумму очков на руке.
   */
  calculateHand = () => {
    let score = 0;
    let hasAce = false;
    for (let card of this.hand) {
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

    this.score = score;
  };

  fillHandAndScore = (handEl, scoreEl) => {
    handEl.innerHTML = this.handCardsElement(this.hand).outerHTML;
    scoreEl.textContent = 'Очки: ' + this.score;
  };

  updatePlayerUI = () => {
    const handElement = document.getElementById(`player-${this.id}-hand`);
    const scoreElement = document.getElementById(`player-${this.id}-score`);

    if (handElement && scoreElement) {
      this.fillHandAndScore(handElement, scoreElement);
    }
  };
}
