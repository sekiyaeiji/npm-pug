'use strict';
const ERROR = 2;

module.exports = {
  extends: [
    'eslint-config-gnavi',
    'prettier'
  ],
  parser: 'babel-eslint',
  env: {
    'es6': true,
    // 使用環境設定
    browser: true,
  },
  globals: {
    // global変数許可設定
    gNaviGlobalState: true,
    google: true,
  },
  plugins: [
    'prettier'
  ],
  rules: {
    // use strictを許可
    'strict': 0,
    // console メソッドを警告
    'no-console': 1
  }
}
