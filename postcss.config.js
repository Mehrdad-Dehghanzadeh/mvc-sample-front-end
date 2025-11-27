const autoprefixer = require('autoprefixer');
const postcssRTLCSS = require('postcss-rtlcss');
const { Mode, Source, Autorename } = require('postcss-rtlcss/options');


module.exports = {
  plugins: [
    { '@tailwindcss/postcss': {} },
    postcssRTLCSS({
      mode: Mode.override,
      source: Source.rtl,
      autoRename: Autorename.flexible,
    }),

    autoprefixer(),
  ],
};
