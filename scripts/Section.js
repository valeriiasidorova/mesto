class Section {
  constructor( { items, renderer }, containerSelector ) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item.name, item.link);
    });
  }

  // разделить логику на append и prepend
  addItem(el) {
    this._container.append(el);
  }
}

export default Section;
