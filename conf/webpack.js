const webpack = require('webpack')
const PrettierPlugin = require('prettier-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StyleLint = require('stylelint-webpack-plugin')

module.exports = [
  // js
  {
    entry: {
      common: './src/js/common.js'
    },
    output: {
      path: __dirname + '/../dist/js', //ビルドしたファイルを吐き出す場所(絶対パス)
      filename: '[name].js' //ビルドした後のファイル名
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query:{
            presets: ['es2015']
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            configFile: './conf/eslintrc.js'
          }
        }
      ]
    },
    plugins: [
      new PrettierPlugin({
        printWidth: 120,
        tabWidth: 2,
        singleQuote: true,
        trailingComma: 'all',
        semi: false,
        bracketSpacing: true
      }),
      new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery'
      })
    ]
  },
  // css
  {
    entry: {
      common: './src/scss/common/import.scss'
    },
    output: {
      path: __dirname + '/../dist/css',
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: false
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('precss'),
                    require('cssnano'),
                    require('autoprefixer')({
                      grid: true,
                      'browsers': ['> 1%', 'last 2 versions'],
                      sourceMap: false
                    })
                  ];
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: './[name].css'
      }),
      new StyleLint({
        configFile: './conf/stylelintrc.js',
        context: 'src/css',
        files: '**/*.scss',
        failOnError: false,
        quiet: false
      })
    ]
  }
]
