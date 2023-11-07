export default class ModalWindow {
  constructor() {
    this.beforeButtonElement=null
    this.buttonText = null;
    this.buttonFunction = null;
    this.modal = null;
  }

  createModalElement = () => {
    // Создание модального окна
    this.modal = document.createElement('div');
    
    this.modal.classList.add('modal');
    if(this.beforeButtonElement)
    this.modal.appendChild(this.beforeButtonElement)

    this.createButton();
    return this.modal;
  };

  createButton = () => {
    // Кнопка
    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('modal__button');
    button.textContent = this.buttonText;
    button.addEventListener('click', () => {
      this.closeModal();
      this.buttonFunction();
    });
    this.modal.appendChild(button);
  };

  openModal = (beforeButtonElement, buttonText, buttonFunction) => {
    if (!this.modal) {
      this.buttonText = buttonText;
      this.buttonFunction = buttonFunction;
      this.beforeButtonElement=beforeButtonElement

      this.createModalElement();
    }

    document.body.appendChild(this.modal);
  };

  closeModal = () => {
    if (this.modal) {
      this.modal.remove();
    }
  };
}
