import GSAP from 'gsap';
import each from 'lodash/each';

export default class Page {
 constructor({
  element,
  elements,
  id
 }) {
  this.selector = element;
  this.selectorChildrens = {
   ...elements
  };

  this.id = id;
 }

 create() {
  this.element = document.querySelector(this.selector);

  this.elements = {};

  each(this.selectorChildrens, (entry, key) => {
   if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
    this.elements[key] = entry;
   } else {
    this.elements[key] = document.querySelectorAll(entry);

    if (this.elements[key].length === 0) {
     this.elements[key] = null;
    } else {
     this.elements[key] = document.querySelector(entry);
    }
   }

  });

 }

 //Animates in from current page
 show() {
  return new Promise(resolve => {
   GSAP.from(this.element, {
    autoAlpha: 0,
    onComplete: resolve
   });
  });
 };

 //Animates out from current page
 hide() {
  return new Promise(resolve => {
   GSAP.to(this.element, {
    autoAlpha: 0,
    onComplete: resolve
   });
  });

 }
}
