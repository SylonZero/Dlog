const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  // Minified version
  {
    entry: './src/dlog.js',
    output: {
      filename: 'dlog.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    mode: 'production',
  },
  // CommonJS version
  {
    entry: './src/dlog-cjs.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'dlog.cjs.js',
      library: {        
        type: 'commonjs2',
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    mode: 'production',
  },
  // ESM version
  {
    entry: './src/dlog-esm.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'dlog.esm.js',
      library: {
        type: 'module',
      },
    },
    experiments: {
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    mode: 'production',
  },
];
