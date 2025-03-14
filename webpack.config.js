// Essential Webpack Plugins
import path from 'path';
import { fileURLToPath } from 'url';
// import { dirname } from 'path';
import webpack from 'webpack';

import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dirApp = path.join(__dirname, 'app');
const dirShared = path.join(__dirname, 'shared');
const dirStyles = path.join(__dirname, 'styles');
const dirNode = 'node_modules';

export default {
 entry: [path.join(dirApp, 'index.js'), path.join(dirStyles, 'index.scss')],

 resolve: {
  modules: [dirApp, dirShared, dirStyles, dirNode]
 },

 plugins: [
  new webpack.DefinePlugin({
   IS_DEVELOPMENT
  }),

  new CleanWebpackPlugin(),

  new CopyWebpackPlugin({
   patterns: [
    {
     from: './shared',
     to: ''
    }
   ]
  }),

  new MiniCssExtractPlugin({
   filename: '[name].css',
   chunkFilename: '[id].css'
  }),

  new ImageMinimizerPlugin({
   minimizer: {
    implementation: ImageMinimizerPlugin.imageminMinify,
    options: {
     plugins: [
      ['gifsicle', { interlaced: true }],
      ['jpegtran', { progressive: true }],
      ['optipng', { optimizationLevel: 8 }]
     ]
    }
   }
  })
 ],

 module: {
  rules: [
   {
    test: /\.js$/,
    use: {
     loader: 'babel-loader'
    }
   },

   {
    test: /\.scss$/,
    use: [
     {
      loader: MiniCssExtractPlugin.loader,
      options: {
       publicPath: ''
      }
     },

     {
      loader: 'css-loader'
     },

     {
      loader: 'postcss-loader'
     },

     {
      loader: 'sass-loader',
      options: {
       sassOptions: {
        // quietDeps: true,
        silenceDeprecations: ['import']
       }
      }
     }
    ]
   },

   {
    test: /\.(png|jpg|gif|jpe?g|svg|webp|mp4)$/,
    type: 'asset/resource',
    generator: {
     filename: '[name].[hash].[ext]'
    }
   },

   {
    test: /\.(woff2?|fnt)$/,
    type: 'asset/inline'
   },

   {
    test: /\.(jpe?g|png|gif|svg|webp)$/i,
    use: [
     {
      loader: ImageMinimizerPlugin.loader
     }
    ]
   },

   {
    test: /\.(glsl|frag|vert)$/,
    type: 'asset/source', // replaced raw-loader
    exclude: /node_modules/
   },

   {
    test: /\.(glsl|frag|vert)$/,
    loader: 'glslify-loader',
    exclude: /node_modules/
   }
  ]
 },

 optimization: {
  minimize: true,
  minimizer: [new TerserPlugin()]
 }
};
