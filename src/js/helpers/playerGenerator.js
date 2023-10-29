export const playerGenerator = function* (players) {
  for (let i = 0; i < players.length; i++) {
    yield players[i];
  }
};
