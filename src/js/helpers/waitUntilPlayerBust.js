export const waitUntilPlayerBust = (player) => {

    return new Promise((resolve) => {
      const checkStopped = () => {
        if (player.score>21) {
            player.setStopped()
          resolve();
        } else {
          setTimeout(checkStopped, 100); // Проверка каждые 100 миллисекунд
        }
      };
      checkStopped();
    });
  };