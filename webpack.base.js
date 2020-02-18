const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function commonConfig(env) {
  return {
    context: __dirname,
    output: {
      path: `${__dirname}/build/`,
      publicPath: '/',
      filename: '[hash].bundle.js',
      sourceMapFilename: '[hash].bundle.map',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['src', 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?importLoaders=1',
              'postcss-loader',
            ],
          }),
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: 'file-loader',
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        },
        {
          test: /\.svg$/,
          loaders: ['babel-loader', {
            loader: 'react-svg-loader',
            query: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
            },
          }],
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('[contenthash].styles.css'),
      new HtmlWebpackPlugin({
        template: 'index.tpl.html',
        chunksSortMode: 'dependency',
        env: env.NODE_ENV,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(env.NODE_ENV),
          'API_URL': JSON.stringify(env.API_URL),
          'ENDPOINT': JSON.stringify(`${env.API_URL || ''}/api/v1`),
          'STRIPE_API_KEY': `'${env.STRIPE_API_KEY}'`,
          'AWS_S3_BUCKET': `'${env.AWS_S3_BUCKET}'`,
        },
      }),
    ],
  };
};
