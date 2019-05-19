import PaginationView from '../view/PaginationView';

export default class Slider {
  constructor() {
    this.handlers = {};
  }

  static getClipsPerPage() {
    const wrapper = document.querySelector('.clip__wrapper');
    return getComputedStyle(wrapper).getPropertyValue('--clips-per-page');
  }

  static getCountsClips() {
    const clipList = document.querySelector('.clip__list');
    return clipList.childNodes.length;
  }

  static getCurrentPage() {
    const currentPage = document.querySelector('.current-page');
    return Number(currentPage.textContent);
  }

  addHandler(event, handler) {
    this.handlers[event] = handler;
  }

  isLastPage() {
    const clipsPerPage = Slider.getClipsPerPage();
    const countWatchedClips = clipsPerPage * Slider.getCurrentPage();
    const countNonWatchedClips = Slider.getCountsClips() - countWatchedClips;
    if (countNonWatchedClips < clipsPerPage) {
      this.handlers.getExtraClips();
    }
  }

  async start() {
    const slider = document.querySelector('.clip__list');
    let previousWidth = window.innerWidth || document.body.clientWidth;
    let isDown = false;
    let startX;
    let scrollLeft;
    let step;

    const pagination = new PaginationView(1);
    pagination.render();


    const mouseDownHandler = (event) => {
      event.preventDefault();
      isDown = true;
      slider.classList.add('active');
      startX = event.pageX - slider.offsetLeft;
      ({ scrollLeft } = slider);
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      slider.classList.remove('active');
    };

    const mouseUpHandler = () => {
      isDown = false;
      slider.style.scrollBehavior = 'smooth';
      slider.classList.remove('active');
      if (step > 3) {
        slider.scrollLeft = scrollLeft - document.documentElement.clientWidth;
        PaginationView.changePage('decrease');
      } else if (step < -3) {
        slider.scrollLeft = scrollLeft + document.documentElement.clientWidth;
        PaginationView.changePage('increase');
        this.isLastPage();
      }
    };

    const mouseMoveHandler = (event) => {
      slider.style.scrollBehavior = '';
      if (isDown) {
        event.preventDefault();
        const x = event.pageX - slider.offsetLeft;
        step = x - startX;
        slider.scrollLeft = scrollLeft - step;
      }
    };

    const resizeHandler = () => {
      const currentWidth = window.innerWidth || document.body.clientWidth;
      const difference = previousWidth - currentWidth;
      if (slider.scrollLeft > 0) {
        slider.scrollLeft -= difference;
      }
      previousWidth = currentWidth;
    };

    slider.addEventListener('mousedown', mouseDownHandler);
    slider.addEventListener('mouseleave', mouseLeaveHandler);
    slider.addEventListener('mouseup', mouseUpHandler);
    slider.addEventListener('mousemove', mouseMoveHandler);

    window.addEventListener('resize', resizeHandler);

    // --- Work with pagination ---

    const beforePrevPage = document.querySelector('.before-prev-page');
    const prevPage = document.querySelector('.prev-page');
    const nextPage = document.querySelector('.next-page');
    const paginationList = document.querySelector('.pagination__list');

    const mouseClickPage = (event) => {
      const { target } = event;
      slider.style.scrollBehavior = 'smooth';
      if (target === nextPage) {
        slider.scrollLeft += document.documentElement.clientWidth;
        PaginationView.changePage('increase');
        this.isLastPage();
      } else if (target === prevPage) {
        slider.scrollLeft -= document.documentElement.clientWidth;
        PaginationView.changePage('decrease');
      } else if (target === beforePrevPage) {
        slider.scrollLeft -= (document.documentElement.clientWidth * 2);
        PaginationView.changePage('decrease');
        PaginationView.changePage('decrease');
      }
    };

    const mouseDownPage = (event) => {
      const { target } = event;
      if (target === beforePrevPage || target === prevPage || target === nextPage) {
        target.firstChild.classList.remove('visually-hidden');

        target.addEventListener('mouseleave', () => {
          target.firstChild.classList.add('visually-hidden');
        });
      }
    };

    const mouseUpPage = (event) => {
      const { target } = event;
      if (target === beforePrevPage || target === prevPage || target === nextPage) {
        target.firstChild.classList.add('visually-hidden');
      }
    };

    paginationList.addEventListener('click', mouseClickPage);
    paginationList.addEventListener('mousedown', mouseDownPage);
    paginationList.addEventListener('mouseup', mouseUpPage);
  }
}
