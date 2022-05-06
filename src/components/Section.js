class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item.name, item.link);
    });
  }

  addItem(el) {
    this._container.prepend(el);
  }
}

export default Section;
