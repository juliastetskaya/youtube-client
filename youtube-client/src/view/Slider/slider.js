export default class Slider {
  static start() {
    const slider = document.querySelector('.clip__list');
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
      console.log(slider.clientLeft);
      console.log(slider.clientWidth);
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
        slider.scrollLeft = scrollLeft - document.documentElement.clientWidth;
        pageNumber -= 1;
      } else if (step < 0) {
        slider.scrollLeft = scrollLeft + document.documentElement.clientWidth;
        pageNumber += 1;
      }
      console.log('after', slider.scrollLeft);
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

    let previousWidth = window.innerWidth || document.body.clientWidth;

    window.addEventListener('resize', () => {
      const currentWidth = window.innerWidth || document.body.clientWidth;
      const difference = previousWidth - currentWidth;
      console.log('difference', difference);
      console.log(slider.scrollLeft);
      if (slider.scrollLeft > 0) {
        slider.scrollLeft -= difference;
      }
      console.log(slider.offsetWidth);
      console.log(slider.scrollLeft);
      previousWidth = currentWidth;
    });
  }
}
