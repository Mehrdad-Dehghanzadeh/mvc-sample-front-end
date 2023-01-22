const process = require('process');

const purgecss = require('@fullhuman/postcss-purgecss');
const autoprefixer = require('autoprefixer');
const postcssRTLCSS = require('postcss-rtlcss');
const { Mode, Source, Autorename } = require('postcss-rtlcss/options');

const isDev = !!process.env.WEBPACK_SERVE;

module.exports = {
  plugins: [
    isDev
      ? null
      : purgecss({
          safelist: {
            standard: [
              /active$/,
              /actived$/,
              /enable$/,
              /enabled$/,
              /disabled$/,
              /disabled$/,
              /hidden$/,
              'row',
              /^col/,
              /^container.*/,
              /^heading.*/,
              /^subtitle.*/,
              /^text.*/,
              /^body.*/,
              /^modal.*/,
            ],
            deep: [],
            greedy: [],
            keyframes: [],
            variables: [],
          },
          content: ['./src/views/*.html'],
        }),

    postcssRTLCSS({
      mode: Mode.override,
      source: Source.rtl,
      autoRename: Autorename.flexible,
    }),

    autoprefixer(),
  ],
};
