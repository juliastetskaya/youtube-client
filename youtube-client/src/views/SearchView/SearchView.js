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
    input.classList.add('search__box');
    inputSection.append(input);
    document.body.append(inputSection);
  }
}
