import createElement from '../DomApi';

export default class PaginationView {
  constructor(page) {
    this.currentPage = page;
    this.prevPage = page - 1;
    this.beforePrevPage = page - 2;
    this.nextPage = page + 1;
  }

  render() {
    const paginationSection = createElement('section', 'pagination');

    const pagination = createElement('div', 'pagination__list');

    const beforePrevPage = createElement('button', 'pagination__item before-prev-page visually-hidden', this.beforePrevPage);
    beforePrevPage.setAttribute('type', 'button');

    const prevPage = createElement('button', 'pagination__item prev-page visually-hidden', this.prevPage);
    prevPage.setAttribute('type', 'button');

    const currentPage = createElement('button', 'pagination__item current-page', this.currentPage);
    currentPage.setAttribute('type', 'button');

    const nextPage = createElement('button', 'pagination__item next-page', this.nextPage);
    nextPage.setAttribute('type', 'button');

    pagination.append(beforePrevPage, prevPage, currentPage, nextPage);
    paginationSection.append(pagination);

    const wrapper = document.querySelector('.page__wrapper');
    wrapper.append(paginationSection);
  }

  static changePage(diff) {
    const beforePrevPage = document.querySelector('.before-prev-page');
    const prevPage = document.querySelector('.prev-page');
    const currentPage = document.querySelector('.current-page');
    const nextPage = document.querySelector('.next-page');
    const pages = [beforePrevPage, prevPage, currentPage, nextPage];
    const currentPageNumber = Number(currentPage.textContent);

    pages.forEach((page) => {
      const p = page;
      if (diff === 'increase') {
        p.textContent = Number(p.textContent) + 1;
        if (currentPageNumber === 1) {
          prevPage.classList.remove('visually-hidden');
        } else if (currentPageNumber === 2) {
          beforePrevPage.classList.remove('visually-hidden');
        }
      } else if (diff === 'decrease' && currentPageNumber > 1) {
        p.textContent = Number(p.textContent) - 1;
        if (currentPageNumber === 2) {
          prevPage.classList.add('visually-hidden');
        } else if (currentPageNumber === 3) {
          beforePrevPage.classList.add('visually-hidden');
        }
      }
    });
  }
}
