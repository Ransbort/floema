import path from 'path';

import express from 'express';

import { fileURLToPath } from 'url';
import { client } from './config/prismicConfig.js';
import * as prismic from '@prismicio/client';
import { asHTML } from '@prismicio/client';

// import bodyParser from 'body-parser';
// import logger from 'morgan';
// import methodOverride from 'method-override';
// import errorHandler from 'errorhandler';

import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(methodOverride());
// app.use(errorHandler());

// Set PUG as templating engine
app.set('view engine', 'pug');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));

// console.log(__dirname);

function linkResolver(doc) {
 if (doc.type === 'product') {
  return `/detail/${doc.slug}`;
 }

 if (doc.type === 'about') {
  return `/about`;
 }

 if (doc.type === 'collections') {
  return `/collections`;
 }
 console.log(doc);

 return '/';
}

// Request Handler
const requestHandler = async (client) => {
 const meta = await client.getSingle('meta');
 const navigation = await client.getSingle('navigation');
 const preloader = await client.getSingle('preloader');

 return {
  meta,
  preloader,
  navigation,
 };
};

app.use((req, res, next) => {
 res.locals.ctx = {
  prismic,
  asHTML,
  fetch,
 };

 res.locals.Link = linkResolver;

 res.locals.Numbers = (index) => {
  return `${index == 0 ? 'One' : index == 1 ? 'Two' : index == 2 ? 'Three' : index == 3 ? 'Four' : ''}`;
 };
 next();
});

// Query for the root path.
app.get('/', async (req, res) => {
 // Here we are retrieving the "home" document from your API endpoint
 const home = await client.getSingle('home');
 const defaults = await requestHandler(client);

 const collections = await client.getAllByType('collection', {
  // fetchLinks: 'collection.title',
 });

 // console.log(defaults);

 res.render('pages/home', {
  ...defaults,
  collections,
  home,
 });
});

app.get('/about', async (req, res) => {
 const about = await client.getSingle('about');
 const defaults = await requestHandler(client);

 res.render('pages/about', {
  ...defaults,
  about,
 });
});

app.get('/collections', async (req, res) => {
 // Here we are retrieving the "collection" document from the API endpoint
 const collections = await client.getAllByType('collection', {
  fetchLinks: 'product.image',
 });
 const home = await client.getSingle('home');
 const defaults = await requestHandler(client);

 res.render('pages/collections', {
  ...defaults,
  collections,
  home,
 });
});

app.get('/detail/:uid', async (req, res) => {
 // Here we are retrieving the "collection" document from the API endpoint
 const uid = req.params.uid;

 const product = await client.getByUID('product', uid, {
  // fetchLinks: 'collection.uid',
 });

 const defaults = await requestHandler(client);

 console.log(product);
 res.render('pages/detail', {
  ...defaults,
  product,
 });
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});
