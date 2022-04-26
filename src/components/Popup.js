class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_is-open');
    document.addEventListener('keydown', (evt) => this._closeByEsc(evt));
  }

  close() {
    this._popup.classList.remove('popup_is-open');
    document.removeEventListener('keydown', (evt) => this._closeByEsc(evt));
  }

  _closeByEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _closeByOverlayClick(evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.popup__close-button');

    closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => this._closeByOverlayClick(evt));
  }
}

export default Popup;
