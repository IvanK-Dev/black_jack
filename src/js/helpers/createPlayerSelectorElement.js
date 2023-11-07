/**
 * Создает элемент выбора количества игроков и добавляет его в указанный родительский элемент.
 * @param {HTMLElement} parentElement - Родительский HTML-элемент, в который будет добавлен элемент выбора количества игроков.
 */
export const createPlayerSelectorElement = () => {
  const playerCountElement = document.createElement('div');
  playerCountElement.id = 'player-count';


  playerCountElement.innerHTML =
    '<p id="status">Выберите количество игроков и нажмите "Начать игру".</p>';

  const labelElement = document.createElement('label');
  labelElement.for = 'playerSelect';
  labelElement.textContent = 'Количество игроков: ';

  const selectElement = document.createElement('select');
  selectElement.id = 'playerSelect';

  //создание возможности выбора до 4 игроков
  for (let i = 1; i <= 4; i++) {
    const optionElement = document.createElement('option');
    optionElement.value = i.toString();
    optionElement.innerHTML = `${i} игрок${i === 1 ? '' : 'а'}`;
    selectElement.appendChild(optionElement);
  }
  playerCountElement.appendChild(labelElement);
  playerCountElement.appendChild(selectElement)
  return playerCountElement
};
