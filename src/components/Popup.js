class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeByEsc = this._closeByEsc.bind(this);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_is-open');
    document.addEventListener('keydown', this._closeByEsc);
  }

  close() {
    this._popup.classList.remove('popup_is-open');
    document.removeEventListener('keydown', this._closeByEsc);
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
    this._closeButton.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => this._closeByOverlayClick(evt));
  }
}

export default Popup;
