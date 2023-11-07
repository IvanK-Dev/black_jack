/**
 * Создает элемент карты на основе переданной строки карты.
 * @param {string} cardStr - Строка, используемая для создания карты.
 * @returns {HTMLElement} - Возвращает созданный элемент карты.
 */
export const createCardElement = (cardStr) => {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card-box');

  const HTMLContent = `
    <svg class="card__image">
        <use href="src/img/deck/deck.svg#${cardStr}"></use>
    </svg>`;
  cardElement.innerHTML = HTMLContent;

  return cardElement;
};
