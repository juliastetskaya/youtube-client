export default class Slider {
  static start() {
    const slider = document.querySelector('.clip__list');
    const windowWidth = document.documentElement.clientWidth;
    let isDown = false;
    let startX;
    let scrollLeft;
    let step;
    let pageNumber = 1;

    slider.addEventListener('mousedown', (event) => {
      event.preventDefault();
      isDown = true;
      slider.classList.add('active');
      startX = event.pageX - slider.offsetLeft;
      ({ scrollLeft } = slider);
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.scrollBehavior = 'smooth';
      slider.classList.remove('active');
      if (step > 0 && pageNumber > 1) {
        slider.scrollLeft = scrollLeft - windowWidth;
        pageNumber -= 1;
      } else if (step < 0) {
        slider.scrollLeft = scrollLeft + windowWidth;
        pageNumber += 1;
      }
    });

    slider.addEventListener('mousemove', (event) => {
      slider.style.scrollBehavior = '';
      if (isDown) {
        event.preventDefault();
        const x = event.pageX - slider.offsetLeft;
        step = x - startX;
        slider.scrollLeft = scrollLeft - step;
      }
    });
  }
}
