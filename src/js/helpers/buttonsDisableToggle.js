/**
 * Функция для включения или отключения кнопок в массиве.
 *
 * @param {HTMLButtonElement[]} buttonsElementArrey - Массив HTML-элементов кнопок.
 * @returns {void}
 */
export const buttonsDisableToggle = (buttonsElementArrey) => {
  buttonsElementArrey.forEach((button) => {
    button.disabled = !button.disabled;
  });
};
