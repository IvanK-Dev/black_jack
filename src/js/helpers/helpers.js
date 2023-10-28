export const handCards = (cards) => {
  const list = document.createElement('ul');

  cards.forEach((card) => {
    const listItem = document.createElement('li');
    listItem.textContent = card;
    list.append(listItem);
  });
  console.log('handCards', list);
  return list;
};

export const addButtons = (playerId) => {
  const buttonsInfo = [
    { text: 'Взять', id: `player${playerId}-hitButton` },
    { text: 'Стоп', id: `player${playerId}-stopButton` },
  ];

  const type = 'button';

  const buttonList = document.createElement('ul');
  buttonList.classList='player-button-list'

  buttonsInfo.forEach(({ text, id }) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.id = id;

    const listItem = document.createElement('li');
    listItem.append(button);
    buttonList.append(listItem);
  });

  return buttonList;
};
