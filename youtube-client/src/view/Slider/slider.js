export default class Slider {
  static start() {
    const slider = document.querySelector('.clip__list');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (event) => {
      isDown = true;
      slider.classList.add('active');
      startX = event.pageX - slider.offsetLeft;
      // eslint-disable-next-line prefer-destructuring
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (event) => {
      if (isDown) {
        event.preventDefault();


        const x = event.pageX - slider.offsetLeft;
        const step = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - step;
      }
    });
  }
}
