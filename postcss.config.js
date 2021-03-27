const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        require('autoprefixer'),

        purgecss({
            safelist: {
                standard: [
                    /--active$/
                ],
                deep: [],
                greedy: [],
                keyframes: [],
                variables: []
            },
            content: ['./src/views/*.html']
        }),
    ]
}