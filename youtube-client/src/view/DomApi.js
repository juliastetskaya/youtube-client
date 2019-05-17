export default (tag, classNames, textNode = '') => {
  const element = document.createElement(tag);
  const classes = classNames.split(' ');
  classes.forEach(className => element.classList.add(className));

  if (textNode) {
    const elementNode = document.createTextNode(textNode);
    element.append(elementNode);
  }

  return element;
};
