export default class Slider {
  static start() {
    const slider = document.querySelector('.clip__list');
    let isDown = false;
    let startX;
    let scrollLeft;
    let step;

    slider.addEventListener('mousedown', (event) => {
      isDown = true;
      slider.classList.add('active');
      startX = event.pageX - slider.offsetLeft;
      ({ scrollLeft } = slider);
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (event) => {
      if (isDown) {
        event.preventDefault();
        const x = event.pageX - slider.offsetLeft;
        step = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - step;
      }
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
      if (step > 0) {
        slider.scrollLeft = scrollLeft - document.documentElement.clientWidth;
      } else if (step < 0) {
        slider.scrollLeft = scrollLeft + document.documentElement.clientWidth;
      }
    });
  }
}
