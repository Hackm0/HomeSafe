const webpack = require('webpack');

module.exports = function override(config) {
    config.resolve.fallback = {
        ...config.resolve.fallback,
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser")
    };

    return config;
};
