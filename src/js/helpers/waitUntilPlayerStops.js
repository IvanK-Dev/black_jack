export const waitUntilPlayerStops = (player) => {

  return new Promise((resolve) => {
    const checkStopped = () => {
      if (player.stopped) {
        resolve();
      } else {
        setTimeout(checkStopped, 100); // Проверка каждые 100 миллисекунд
      }
    };
    checkStopped();
  });
};
