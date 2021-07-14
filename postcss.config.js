const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    plugins: [
        require('autoprefixer'),

        purgecss({
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
                    /^container*/,
                    /^heading*/,
                    /^subtitle*/,
                    /^text*/,
                    /^body*/,
                    /^modal*/,
                ],
                deep: [],
                greedy: [],
                keyframes: [],
                variables: [],
            },
            content: ['./src/views/*.html'],
        }),
    ],
};
