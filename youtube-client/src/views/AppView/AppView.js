export default class AppView {
  constructor(data) {
    this.data = data;
  }

  render() {
    const clipList = document.createElement('ul');
    clipList.classList.add('clip__list');

    this.data.forEach(({ title }) => {
      const clipItem = document.createElement('li');
      clipItem.classList.add('clip__item');

      const titleNode = document.createTextNode(title);
      clipItem.append(titleNode);

      clipList.append(clipItem);
    });

    document.body.append(clipList);
  }
}
