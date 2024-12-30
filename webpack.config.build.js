import path from 'path';
import { merge } from 'webpack-merge';

import config from './webpack.config.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(config, {
 mode: 'production',

 output: {
  path: path.join(__dirname, 'public'),
 },
});