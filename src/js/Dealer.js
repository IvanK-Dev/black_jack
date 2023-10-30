import Player from './Player.js';

export default class Dealer extends Player {
  constructor() {
    super();
  }

  createPlayerElement = () => {
    const dealerElement = document.createElement('div');
    dealerElement.id = 'dealer-area';
    dealerElement.classList = 'area';
    const title = document.createElement('h2');
    title.textContent = 'Дилер';

    const handElement = document.createElement('div');
    handElement.id = 'dealer-hand';
    handElement.classList = 'hand';

    const scoreElement = document.createElement('p');
    scoreElement.id = 'dealer-score';
    scoreElement.classList = 'score';

    scoreElement.style.visibility='hidden'

    dealerElement.append(title);
    dealerElement.append(handElement);
    dealerElement.append(scoreElement);


    return dealerElement;
  };

  updatePlayerUI = () => {
    const handDealerElement = document.getElementById(`dealer-hand`);
    const scoreDealerElement = document.getElementById(`dealer-score`);

    if (handDealerElement && scoreDealerElement) {
      this.fillHandAndScore(handDealerElement, scoreDealerElement);
    }
  };
}
