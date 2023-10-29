import Player from './Player.js';

export default class BotPlayer extends Player {
  constructor() {
    super();
    this.isBotPlayer = true;
  }
}
