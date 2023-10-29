/**
 * Функция для определения вероятности взятия карты дилером на основе оставшихся очков до 21.
 *
 * @param {number} points - Текущее количество очков дилера.
 * @returns {number} - Возвращает вероятность взятия карты.
 */
const calculateProbability = (points) => {
  const remainingPoints = 21 - points; // Осталось очков до 21
  const probability = 1 / remainingPoints; // Чем больше осталось до 21, тем выше вероятность

  return Math.min(0.8, probability);
};

/**
 * Функция для взятия карт дилером.
 *
 * @param {object} player - Объект, представляющий дилера.
 * @param {array} deck - Колода карт.
 */
export const dealerOrBotDrawCards = (player, deck) => {
  // Начинаем брать карты для дилера
  while (true) {
    player.calculateHand();
    let dealerPoints = player.score; // Получаем сумму очков в руке дилера

    if (
      dealerPoints < 17 ||
      (dealerPoints < 21 && Math.random() < calculateProbability(dealerPoints))
    ) {
      const newCard = player.dealCard(deck);
      player.hand.push(newCard); // Добавляем новую карту в руку дилера
    } else {
      break;
    }
  }
};
