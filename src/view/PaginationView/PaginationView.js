import createElement from '../DomApi';

export default class SliderView {
  constructor(page) {
    this.currentPage = page;
    this.prevPage = page - 1;
    this.beforePrevPage = page - 2;
    this.nextPage = page + 1;
  }

  async render() {
    const paginationSection = createElement('section', 'pagination');

    const pagination = createElement('div', 'pagination__list');

    const beforePrevPage = createElement('button', 'pagination__item before-prev-page visually-hidden');
    const numberBeforePrevPage = createElement('span', 'pagination__page-number visually-hidden', this.beforePrevPage);
    beforePrevPage.append(numberBeforePrevPage);

    const prevPage = createElement('button', 'pagination__item prev-page visually-hidden');
    const numberPrevPage = createElement('span', 'pagination__page-number visually-hidden', this.prevPage);
    prevPage.append(numberPrevPage);

    const currentPage = createElement('button', 'pagination__item current-page', this.currentPage);

    const nextPage = createElement('button', 'pagination__item next-page');
    const numberNextPage = createElement('span', 'pagination__page-number visually-hidden', this.nextPage);
    nextPage.append(numberNextPage);

    [beforePrevPage, prevPage, currentPage, nextPage].forEach(page => page.setAttribute('type', 'button'));

    pagination.append(beforePrevPage, prevPage, currentPage, nextPage);
    paginationSection.append(pagination);

    const wrapper = document.querySelector('.page__wrapper');
    wrapper.append(paginationSection);
  }

  static changePage(diff) {
    const beforePrevPage = document.querySelector('.before-prev-page>span');
    const prevPage = document.querySelector('.prev-page>span');
    const currentPage = document.querySelector('.current-page');
    const nextPage = document.querySelector('.next-page>span');
    const pages = [beforePrevPage, prevPage, currentPage, nextPage];
    const currentPageNumber = Number(currentPage.textContent);

    pages.forEach((page) => {
      const p = page;
      if (diff === 'increase') {
        p.textContent = Number(p.textContent) + 1;
        if (currentPageNumber === 1) {
          prevPage.closest('button').classList.remove('visually-hidden');
        } else if (currentPageNumber === 2) {
          beforePrevPage.closest('button').classList.remove('visually-hidden');
        }
      } else if (diff === 'decrease' && currentPageNumber > 1) {
        p.textContent = Number(p.textContent) - 1;
        if (currentPageNumber === 2) {
          prevPage.closest('button').classList.add('visually-hidden');
        } else if (currentPageNumber === 3) {
          beforePrevPage.closest('button').classList.add('visually-hidden');
        }
      }
    });
  }
}
