import Player from './Player.js';

export default class BotPlayer extends Player {
  /**
   * Конструктор класса BotPlayer.
   * Устанавливает флаг для указания, что это бот-игрок.
   */
  constructor() {
    super();
    this.isBotPlayer = true;
  }
  /**
   * Создает HTML-элемент игрока.
   * @returns {HTMLElement} - Элемент игрока.
   */
  createPlayerElement = () => {
    const botPlayerElement = document.createElement('div');
    botPlayerElement.id = `player-${this.id}-area`;
    botPlayerElement.className = 'player-area area';
    const title = document.createElement('h2');
    title.textContent = `Игрок ${this.id}`;

    const handElement = document.createElement('div');
    handElement.id = `player-${this.id}-hand`;
    handElement.className = 'hand';

    const scoreElement = document.createElement('p');
    scoreElement.id = `player-${this.id}-score`;
    scoreElement.className = 'score';

    botPlayerElement.append(title);
    botPlayerElement.append(handElement);
    botPlayerElement.append(scoreElement);

    return botPlayerElement;
  };
}
