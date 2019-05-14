export default (tag, className, textNode = '') => {
  const element = document.createElement(tag);
  element.classList.add(className);

  if (textNode) {
    const elementNode = document.createTextNode(textNode);
    element.append(elementNode);
  }

  return element;
};
