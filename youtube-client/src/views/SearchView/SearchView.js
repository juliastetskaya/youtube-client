export default class SearchView {
  constructor(status) {
    this.status = status;
  }

  render() {
    const inputSection = document.createElement('section');
    inputSection.classList.add('search');

    const input = document.createElement('input');
    input.setAttribute('placeholder', this.status);
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'search-box');
    input.classList.add('search__box');

    const label = document.createElement('label');
    label.setAttribute('for', 'search-box');
    label.classList.add('search__label');

    label.append(input);
    inputSection.append(label);
    document.body.append(inputSection);
    document.body.classList.add('page');
  }
}
