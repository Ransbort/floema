import { merge } from 'webpack-merge';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import config from './webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(config, {
 mode: 'development',

 devtool: 'inline-source-map',

 devServer: {
  devMiddleware: {
   writeToDisk: true,
  },
 },

 output: {
  path: path.resolve(__dirname, 'public'),
  assetModuleFilename: '[name][ext]',
  clean: true,
 },
});
