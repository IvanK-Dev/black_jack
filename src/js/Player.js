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
    this.stopped = false;
  }

  /**
   * Создает элемент для отображения игрока.
   * @returns {HTMLElement} - Элемент, представляющий игрока.
   */
  createPlayerElement = () => {
    const playerElement = document.createElement('div');
    playerElement.id = `player-${this.id}-area`;
    playerElement.classList = 'player-area area';
    const title = document.createElement('h2');
    title.textContent = `Игрок ${this.id}`;

    const handElement = document.createElement('div');
    handElement.id = `player-${this.id}-hand`;
    handElement.classList = 'hand';

    const scoreElement = document.createElement('p');
    scoreElement.id = `player-${this.id}-score`;
    scoreElement.classList = 'score';

    playerElement.append(title);
    playerElement.append(handElement);
    playerElement.append(scoreElement);

    const buttonsListElement = this.buttonsElement(this.id);
    playerElement.append(buttonsListElement);

    return playerElement;
  };

  /**
   * Создает элемент списка карт на руке игрока.
   * @param {string[]} cards - Массив карт в руке игрока.
   * @returns {HTMLUListElement} - Элемент списка ul с картами игрока.
   */
  handCardsElement = (cards) => {
    const list = document.createElement('ul');
    list.classList='cards__list'

    cards.forEach((card) => {
      const listItem = document.createElement('li');
      const cardEl=  `<div class="card-box">
      <svg class="card__image">
        <use href="src/img/deck/deck.svg#${card}"></use>
      </svg>`                      
      listItem.innerHTML=cardEl;
      list.append(listItem);
    });
    return list;
  };

  /**
   * Создает элемент списка кнопок для игрока.
   * @param {number} playerId - Идентификатор игрока.
   * @returns {HTMLUListElement} - Элемент списка ul с кнопками для игрока.
   */
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

  /**
   * Устанавливает флаг остановки игрока.
   */
  setStopped = () => (this.stopped = true);

  /**
   * Метод раздачи карты игроку.
   * @param {string[]} deck - Колода карт.
   * @returns {string} - Возвращает последнюю карту из колоды.
   */
  dealCard = (deck) => deck.pop();

  /**
   * Метод вычисления очков на руке игрока.
   */
  calculateHand = () => {
    let score = 0;
    let hasAce = false;
    for (let card of this.hand) {
      const value = card.split('_')[0];
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

  /**
   * Обновляет пользовательский интерфейс игрока.
   */
  updatePlayerUI = () => {
    const handElement = document.getElementById(`player-${this.id}-hand`);
    const scoreElement = document.getElementById(`player-${this.id}-score`);

    if (handElement && scoreElement) {
      this.fillHandAndScore(handElement, scoreElement);
    }
  };
}
