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
      title, description, thumbnails, channelTitle, publishedAt,
    }) => {
      const clipItem = createElement('li', 'clip__item');

      const clipImage = createElement('img', 'clip__image');
      clipImage.setAttribute('src', thumbnails.medium.url);
      clipImage.setAttribute('alt', title);
      clipImage.setAttribute('width', thumbnails.medium.width);

      const clipTitle = createElement('h2', 'clip__title', title);

      const clipInfo = createElement('div', 'clip__info');

      const clipChannelTitle = createElement('p', 'clip__channel-title', channelTitle);

      const clipDate = createElement('time', 'clip__date', publishedAt.slice(0, 10));
      clipDate.setAttribute('datetime', publishedAt);

      clipInfo.append(clipChannelTitle, clipDate);

      const clipDescription = createElement('p', 'clip__description', description);

      clipItem.append(clipImage, clipTitle, clipInfo, clipDescription);

      const clipList = document.querySelector('.clip__list');

      clipList.append(clipItem);
    });
  }
}
