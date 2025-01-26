const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    // Entry point for your application
    entry: './src/index.js',

    // Output configuration
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    resolve: {
        fallback: {
            os: require.resolve("os-browserify/browser"),
            path: require.resolve("path-browserify"),
        },
    },
    // Other Webpack configurations...

    plugins: [
        new webpack.DefinePlugin({
            'process.env.REACT_APP_OPENCAGE_API_KEY': JSON.stringify(process.env.REACT_APP_OPENCAGE_API_KEY),
        }),
    ],
};
