import pagination from './Pagination';

export default class Slider {
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

  static isLastPage() {
    const clipsPerPage = Slider.getClipsPerPage();
    const countWatchedClips = clipsPerPage * Slider.getCurrentPage();
    const countNonWatchedClips = Slider.getCountsClips() - countWatchedClips;
    return countNonWatchedClips < clipsPerPage;
  }

  static start() {
    const slider = document.querySelector('.clip__list');
    let previousWidth = window.innerWidth || document.body.clientWidth;
    let isDown = false;
    let startX;
    let scrollLeft;
    let step;

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
      if (step > 0) {
        slider.scrollLeft = scrollLeft - document.documentElement.clientWidth;
        pagination.changePage('decrease');
      } else if (step < 0) {
        slider.scrollLeft = scrollLeft + document.documentElement.clientWidth;
        pagination.changePage('increase');
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

    const wrapper = document.querySelector('.page__wrapper');

    wrapper.addEventListener('click', Slider.isLastPage);

    slider.addEventListener('mousedown', mouseDownHandler);
    slider.addEventListener('mouseleave', mouseLeaveHandler);
    slider.addEventListener('mouseup', mouseUpHandler);
    slider.addEventListener('mousemove', mouseMoveHandler);

    window.addEventListener('resize', resizeHandler);
  }
}
