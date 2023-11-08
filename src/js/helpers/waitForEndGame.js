export function waitForEndGame(game){
  return new Promise((resolve) => {
    const checkStopped = () => {
        console.log('waitForEndGame start game',game)

      if (game && game.endGame) {
        console.log('waitForEndGame')
        resolve(true);
      } else {
        setTimeout(checkStopped, 1000); // Проверка каждые 100 миллисекунд
      }
    };
    checkStopped();
  });
};
