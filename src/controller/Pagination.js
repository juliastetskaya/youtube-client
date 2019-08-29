import PaginationView from '../view/PaginationView';

export default class Pagination {
  static start() {
    const pagination = new PaginationView(1);

    pagination.render();

    const slider = document.querySelector('.clip__list');
    const beforePrevPage = document.querySelector('.before-prev-page');
    const prevPage = document.querySelector('.prev-page');
    const nextPage = document.querySelector('.next-page');
    const paginationList = document.querySelector('.pagination__list');

    const mouseClickHandler = (event) => {
      const { target } = event;
      slider.style.scrollBehavior = 'smooth';
      if (target === nextPage) {
        slider.scrollLeft += document.documentElement.clientWidth;
        PaginationView.changePage('increase');
      } else if (target === prevPage) {
        slider.scrollLeft -= document.documentElement.clientWidth;
        PaginationView.changePage('decrease');
      } else if (target === beforePrevPage) {
        slider.scrollLeft -= (document.documentElement.clientWidth * 2);
        PaginationView.changePage('decrease');
        PaginationView.changePage('decrease');
      }
    };

    paginationList.addEventListener('click', mouseClickHandler);
  }

  static changePage(diff) {
    PaginationView.changePage(diff);
  }
}
