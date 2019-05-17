import createElement from '../DomApi';

export default class Pagination {
  static render() {
    const paginationSection = createElement('section', 'pagination');

    const pagination = createElement('div', 'pagination__list');
    const beforePrevPage = createElement('button', 'pagination__item before-prev-page visually-hidden');
    const prevPage = createElement('button', 'pagination__item prev-page visually-hidden');
    const currentPage = createElement('button', 'pagination__item current-page');
    const nextPage = createElement('button', 'pagination__item next-page');

    pagination.append(beforePrevPage, prevPage, currentPage, nextPage);
    paginationSection.append(pagination);

    const wrapper = document.querySelector('.page__wrapper');
    wrapper.append(paginationSection);
  }
}
