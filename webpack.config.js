const fs = require('fs');
const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Chalk = require('chalk');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// get all html file in __Dir
const html = {
  __Dir: path.resolve(__dirname, 'src/views/'),

  entry: [],

  add(files) {
    for (let name of files) {
      this.entry.push(
        new HtmlWebpackPlugin({
          filename: name,
          template: path.resolve(this.__Dir, name),
          minify: false,
          inject: false,
          chunks: ['bundle', 'vendor'],
          scriptLoading: 'blocking',
        })
      );
    }
  },

  modify(fileName, options) {
    const page = this.entry.find((el) => el.options.filename === fileName);
    if (page) {
      Object.assign(page.options, options);
    } else {
      throw Error('not found html file');
    }
  },

  readDir() {
    try {
      const files = fs.readdirSync(this.__Dir);
      this.add(files);
    } catch (error) {
      console.log(error);
    }
  },
};

html.readDir();

// Webpack Config
let config = {
  // source directories
  context: path.resolve(__dirname, 'src'),
  target: 'browserslist',

  // webpack resolve modules
  resolve: {
    modules: ['./node_modules', path.resolve(__dirname, 'src/script')],
    alias: {
      jquery: 'jquery/src/jquery',
      jqueryValidation: 'jquery-validation/dist/jquery.validate.js',
    },
  },

  entry: {
    browser: 'browser.js',

    bundle: [
      // style files
      './scss/main.scss',
      // import library js
      'select2',
      'jquery-validation',

      // import scripts
      'modal.js',
      'main.js',
    ],
  },

  performance: {
    maxEntrypointSize: 2124000,
    maxAssetSize: 5244000,
  },

  // webpack output config

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].js',
    library: '$u',
    libraryTarget: 'var',
    // libraryExport: 'default',
  },

  // webpack plugin config for all mode

  plugins: [
    new CleanWebpackPlugin(),

    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),

    new ProgressBarPlugin({
      format:
        '  build [:bar] ' +
        Chalk.green.bold(':percent') +
        ' (:elapsed seconds)',
      complete: '#',
      clear: false,
    }),

    new copyWebpackPlugin({
      patterns: [
        {
          from: 'static',
        },
      ],
    }),

    //add html page
    ...html.entry,
  ],

  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff)$/i,
        loader: 'file-loader',
        options: {
          name: '[name]/[name].[ext]',
          outputPath: 'fonts',
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: {
              exposes: ['$', 'jQuery'],
            },
          },
        ],
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },

  experiments: {
    topLevelAwait: true,
  },

  //End webpack plugin config for all mode
};

// End Webpack Config

module.exports = (env, { mode }) => {
  // config for development mode

  if (mode === 'development') {
    // progersive bar minial for development mode
    config.stats = 'minimal';
    config.devtool = 'source-map';

    // config loaders for development mode
    config.module.rules.push(
      ...[
        {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.relative(__dirname, 'postcss.config.js'),
                },
              },
            },

            'sass-loader',
          ],
        },
      ]
    );

    //config dev server for development mode
    config.devServer = {
      static: {
        directory: path.resolve(__dirname, 'dist'),
        watch: true,
      },
      port: 9090,
      open: true,
      hot: false,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  }

  // config for production mode
  if (mode === 'production') {
    config.optimization.minimizer.push(new TerserPlugin());

    //config fonts loaders for productions mode
    config.module.rules[0].options.publicPath = '../fonts';

    //config loaders for productions mode
    config.module.rules.push({
      test: /\.(c|sa|sc)ss$/i,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              config: path.relative(__dirname, 'postcss.config.js'),
            },
          },
        },
        'sass-loader',
      ],
    });

    // config plugins for production mode
    config.plugins.push(
      ...[
        new MiniCssExtractPlugin({
          filename: 'css/main.min.css',
        }),

        !!env.ANALYZE
          ? new BundleAnalyzerPlugin({
              openAnalyzer: !!env.ANALYZE,
              analyzerMode: 'static',
              generateStatsFile: true,
              statsFilename: '../.analyze/stats.json',
              reportFilename: '../.analyze/report.html',
            })
          : () => {},
      ]
    );

    config.stats = {
      assets: true,
      moduleAssets: true,
      assetsSort: '!size',
      errors: true,
    };
  }

  return config;
};
