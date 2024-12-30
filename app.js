import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import { client } from './config/prismicConfig.js';
import * as prismic from '@prismicio/client';
import { asHTML } from '@prismicio/client';

import fetch from 'node-fetch';

const app = express();
const port = 3000;

// Set PUG as templating engine
app.set('view engine', 'pug');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'views')));

//HandleRequest

// const handleRequest = async (api) => {
//   const [
//     meta,
//     preloader,
//     navigation,
//     home,
//     about,
//     { collection }
//   ] = await Promise.all([
//     api.getSingle('meta'),
//     api.getSingle('preloader'),
//     api.getSingle('navigation'),
//     api.getSingle('home'),
//     api.getSingle('about'),
//     api.getAllByType('collection', {
//       fetchLinks: 'product.image',
//     })
//   ]);
//
//   return {
//     meta,
//     preloader,
//     navigation,
//     home,
//     about,
//     collection,
//   };
//
// };

app.use((req, res, next) => {
 res.locals.ctx = {
  prismic,
  asHTML,
  fetch,
  // linkResolver: HandleLinkResolver,
 };
 next();
});

// Query for the root path.

app.get('/', async (req, res) => {
 // Here we are retrieving the "home" document from your API endpoint
 const home = await client.getSingle('home');
 const meta = await client.getSingle('meta');

 res.render('pages/home', { home, meta });
});

app.get('/about', async (req, res) => {
 const about = await client.getSingle('about');
 const meta = await client.getSingle('meta');

 const response = { about, meta };
 // const assets = [];

 about.data.gallery.forEach((media) => {
  console.log(media);
 });

 res.render('pages/about', response);
});

app.get('/collection', async (req, res) => {
 // Here we are retrieving the "collection" document from the API endpoint
 const collection = await client.getSingle('collection');
 const meta = await client.getSingle('meta');

 res.render('pages/collection', { collection, meta });
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});
