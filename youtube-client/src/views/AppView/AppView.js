export default class AppView {
  constructor(data) {
    this.data = data;
  }

  static createElement(tag, className, textNode = '') {
    const element = document.createElement(tag);
    element.classList.add(className);

    if (textNode) {
      const elementNode = document.createTextNode(textNode);
      element.append(elementNode);
    }

    return element;
  }

  render() {
    const clipList = AppView.createElement('ul', 'clip__list');

    this.data.forEach(({
      title, description, thumbnails, channelTitle, publishedAt,
    }) => {
      const clipItem = AppView.createElement('li', 'clip__item');

      const clipImage = AppView.createElement('img', 'clip__image');
      clipImage.setAttribute('src', thumbnails.medium.url);
      clipImage.setAttribute('alt', title);
      clipImage.setAttribute('width', thumbnails.medium.width);

      const clipTitle = AppView.createElement('h2', 'clip__title', title);

      const clipInfo = AppView.createElement('div', 'clip__info');

      const clipChannelTitle = AppView.createElement('p', 'clip__channel-title', channelTitle);

      const clipDate = AppView.createElement('time', 'clip__date', publishedAt.slice(0, 10));
      clipDate.setAttribute('datetime', publishedAt);

      clipInfo.append(clipChannelTitle, clipDate);

      const clipDescription = AppView.createElement('p', 'clip__description', description);

      clipItem.append(clipImage, clipTitle, clipInfo, clipDescription);

      clipList.append(clipItem);
    });

    document.body.append(clipList);
  }
}
