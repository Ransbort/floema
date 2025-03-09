// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.

import dotenv from 'dotenv';

dotenv.config();

import fetch from 'node-fetch';
import * as prismic from '@prismicio/client';

const repoName = process.env.PRISMIC_REPO_NAME; // Fill in your repository name.
const accessToken = process.env.PRISMIC_ACCESS_TOKEN;

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
  type: 'collections',
  path: '/collections',
  resolver: {
   // category: 'product',
  },
 },

 {
  type: 'product',
  resolvers: {
   //category: 'collection',
   // section: 'collection.title',
  },
  path: '/detail/:uid',
 },

 {
  type: 'preloader',
  path: '/preloader',
 },

 {
  type: 'navigation',
  path: '/navigation',
 },
];

export const client = prismic.createClient(repoName, {
 fetch,
 accessToken,
 routes,
});
