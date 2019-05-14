import createElement from '../DomApi';

export default class AppView {
  static render(message) {
    const wrapper = createElement('div', 'page__wrapper');

    const inputSection = createElement('section', 'search');

    const input = createElement('input', 'search__box');
    input.setAttribute('placeholder', message);
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'search-box');

    const label = createElement('label', 'search__label');
    label.setAttribute('for', 'search-box');

    label.append(input);
    inputSection.append(label);

    const clipSection = createElement('section', 'clip');

    const clipList = createElement('ul', 'clip__list');

    clipSection.append(clipList);

    wrapper.append(inputSection, clipSection);
    document.body.append(wrapper);
    document.body.classList.add('page');
  }

  static clearClips() {
    const clipList = document.querySelector('.clip__list');
    clipList.innerHTML = '';
  }

  static renderClips(data) {
    data.forEach(({
      title, descript, image, channelTitle, publishedAt, id, viewCount,
    }) => {
      const clipItem = createElement('li', 'clip__item');

      const clipImage = createElement('img', 'clip__image');
      clipImage.setAttribute('src', image.url);
      clipImage.setAttribute('alt', title);
      clipImage.setAttribute('width', image.width);

      const clipLink = createElement('a', 'clip__link', title);
      clipLink.setAttribute('href', `https://www.youtube.com/watch?v=${id}`);
      clipLink.setAttribute('target', '_blank');

      const clipTitle = createElement('h2', 'clip__title');
      clipTitle.append(clipLink);

      const clipInfo = createElement('div', 'clip__info');

      const clipChannelTitle = createElement('p', 'clip__channel-title', channelTitle);

      const clipDate = createElement('time', 'clip__date', publishedAt.slice(0, 10));
      clipDate.setAttribute('datetime', publishedAt);

      const clipViewCount = createElement('p', 'clip__view-count', viewCount);

      clipInfo.append(clipChannelTitle, clipDate, clipViewCount);

      const clipDescription = createElement('p', 'clip__description', descript);

      clipItem.append(clipImage, clipTitle, clipInfo, clipDescription);

      const clipList = document.querySelector('.clip__list');

      clipList.append(clipItem);
    });
  }
}
