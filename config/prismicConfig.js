// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.

// import dotenv from 'dotenv';
// dotenv.config();

import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';

const repoName = 'Lumia'; // Fill in your repository name.
const accessToken =
  'MC5aMjZmc0JFQUFDY0FXdE9D.77-9Fe-_ve-_vSUPCT_vv71z77-9eQHvv73vv71xBnLvv71Gb07vv71xPu-_ve-_vSvvv70mW0k';

// The `routes` property is your route resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
const routes = [
 {
  type: 'home',
  path: '/',
 },

 {
  type: 'about',
  path: '/about',
 },

 {
  type: 'collection',
  path: '/collection',
  resolver: {},
 },

 {
  type: 'preloader',
  path: '/preloader',
 },
];

export const client = prismic.createClient(repoName, {
 fetch,
 accessToken,
 routes,
});
