/**
 * Функция для включения или отключения кнопок в массиве игроков.
 *
 * @param {HTMLButtonElement[]} buttonsElementArrey - Массив HTML-элементов кнопок.
 * @returns {void}
 */
export const buttonsDisableToggle = (buttonsElementArrey) => {
  buttonsElementArrey.forEach((button) => {
    button.disabled = !button.disabled;
  });
};
