import About from 'pages/About/index.js';
import Collections from 'pages/Collections/index.js';
import Detail from 'pages/Details/index.js';
import Home from 'pages/Home/index.js';
import each from 'lodash/each';

class App {
 constructor() {
  this.createContent();
  this.createPages();
  this.addLinkListeners();
 }

 createContent() {
  this.content = document.querySelector('.content');
  this.template = this.content.getAttribute('data-template');

 }

 createPages() {
  this.pages = {
   about: new About(),
   collections: new Collections(),
   detail: new Detail(),
   home: new Home()
  };


  this.page = this.pages[this.template];
  this.page.create();
  this.page.show();
 }

 async onChange(url) {
  await this.page.hide();
  const request = await window.fetch(url);
  if (request.status === 200) {
   const html = await request.text();
   console.log(html);

   const div = document.createElement('div');

   div.innerHTML = html;


   const divContent = div.querySelector('.content');

   this.template = divContent.getAttribute('data-template');

   this.content.setAttribute('data-template', this.template);
   this.content.innerHTML = divContent.innerHTML;

   //Fetches and displaying the new page
   this.page = this.pages[this.template];
   this.page.create();
   this.page.show();
  } else {
   console.error(request.statusText);
  }
 }

 addLinkListeners() {
  const links = document.querySelectorAll('a');
  each(links, link => {
   link.onclick = event => {
    const { href } = link;
    event.preventDefault();

    this.onChange(href);
   };
  });
 }

}

new App();
