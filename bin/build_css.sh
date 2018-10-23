#!/bin/sh

stylelint --config conf/stylelintrc.js src/scss/*.scss &&
  node-sass --output-style expanded src/scss/style.scss -o tmp/css/ &&
  node-sass --output-style compressed src/scss/style.scss -o dist/css/ &&

postcss dist/css/* --use autoprefixer css-mqpacker -d dist/css/ --no-map
