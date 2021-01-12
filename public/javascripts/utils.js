import { _querySelector } from './customs.js';

const _$ = (target, parent = document) => {
  return _querySelector(parent, target);
};

const $ = (target, parent = document) => {
  return parent.querySelector(target);
};

const createNewElement = (tag, className, innerText) => {
  const newElement = document.createElement(tag);
  newElement.className = className;
  newElement.innerText = innerText;
  return newElement;
};

const deleteClassFromElement = (element, className) => {
  element.classList.remove(className);
};

export { _$, $, createNewElement, deleteClassFromElement };