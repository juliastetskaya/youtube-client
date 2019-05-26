import PaginationView from '../view/PaginationView';

export default class Slider {
  constructor() {
    this.handlers = {};
  }

  static getClipsPerPage() {
    const wrapper = document.querySelector('.clip__wrapper');
    return Number(getComputedStyle(wrapper).getPropertyValue('--clips-per-page'));
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
    let leftElement;

    const pagination = new PaginationView(1);
    pagination.render();

    const getLeftElement = () => (Slider.getCurrentPage() - 1) * Slider.getClipsPerPage() + 1;

    const mouseDownHandler = (event) => {
      event.preventDefault();
      isDown = true;
      slider.classList.add('active');
      startX = event.pageX - slider.offsetLeft;
      ({ scrollLeft } = slider);
    };

    const mouseLeaveHandler = () => {
      if (isDown) {
        slider.style.scrollBehavior = 'smooth';
        slider.scrollLeft += step;
      }
      isDown = false;
      slider.classList.remove('active');
      step = 0;
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
      step = 0;
      leftElement = getLeftElement();
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
        slider.scrollLeft -= (difference * (Slider.getCurrentPage() - 1));
      }

      const newLeftElement = getLeftElement();
      if ((newLeftElement + Slider.getClipsPerPage() - 1) < leftElement) {
        const currentPageLeftElement = Math.ceil(leftElement / Slider.getClipsPerPage());
        let diff = currentPageLeftElement - Slider.getCurrentPage();
        slider.scrollLeft += document.documentElement.clientWidth * diff;
        while (diff > 0) {
          PaginationView.changePage('increase');
          diff -= 1;
        }
      } else if (newLeftElement > leftElement) {
        const currentPageLeftElement = Math.ceil(leftElement / Slider.getClipsPerPage());
        let diff = Slider.getCurrentPage() - currentPageLeftElement;
        slider.scrollLeft -= document.documentElement.clientWidth * diff;
        while (diff > 0) {
          PaginationView.changePage('decrease');
          diff -= 1;
        }
      }
      leftElement = getLeftElement();
      previousWidth = currentWidth;
    };

    const touchStartHandler = (event) => {
      isDown = true;
      slider.classList.add('active');
      startX = event.changedTouches[0].pageX - slider.offsetLeft;
      ({ scrollLeft } = slider);
    };

    const touchMoveHandler = (event) => {
      slider.style.scrollBehavior = '';
      if (isDown) {
        const x = event.changedTouches[0].pageX - slider.offsetLeft;
        step = x - startX;
        slider.scrollLeft = scrollLeft - step;
      }
    };

    const touchEndHandler = () => {
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
      step = 0;
      leftElement = getLeftElement();
    };

    slider.addEventListener('mousedown', mouseDownHandler);
    slider.addEventListener('mouseleave', mouseLeaveHandler);
    slider.addEventListener('mouseup', mouseUpHandler);
    slider.addEventListener('mousemove', mouseMoveHandler);

    slider.addEventListener('touchstart', touchStartHandler);
    slider.addEventListener('touchmove', touchMoveHandler);
    slider.addEventListener('touchend', touchEndHandler);

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
      leftElement = getLeftElement();
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

  static clear() {
    const pageWrapper = document.querySelector('.page__wrapper');
    const pagination = document.querySelector('.pagination');
    if (pagination !== null) {
      pageWrapper.removeChild(pagination);
    }
  }
}
