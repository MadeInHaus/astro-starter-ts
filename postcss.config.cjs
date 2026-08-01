const path = require('path');

module.exports = {
    plugins: {
        '@csstools/postcss-global-data': {
            files: [path.resolve(__dirname, 'src/styles/breakpoints.css')],
        },
        'postcss-preset-env': {
            stage: 4,
            features: {
                'nesting-rules': true,
                'color-function': true,
                'custom-media-queries': true,
            },
        },
    },
};
