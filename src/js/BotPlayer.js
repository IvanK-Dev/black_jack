import Player from './Player.js';

export default class BotPlayer extends Player {
  constructor() {
    super();
    this.isBotPlayer = true;
  }

  createPlayerElement = () => {
    const botPlayerElement = document.createElement('div');
    botPlayerElement.id = `player-${this.id}-area`;
    botPlayerElement.classList = 'area';
    const title = document.createElement('h2');
    title.textContent = `Игрок ${this.id}`;

    const handElement = document.createElement('div');
    handElement.id = `player-${this.id}-hand`;
    handElement.classList = 'hand';

    const scoreElement = document.createElement('p');
    scoreElement.id = `player-${this.id}-score`;
    scoreElement.classList = 'score';

    botPlayerElement.append(title);
    botPlayerElement.append(handElement);
    botPlayerElement.append(scoreElement);

    return botPlayerElement;
  };
}
