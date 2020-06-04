/* config-overrides.js */
const CopyPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {

    config.plugins.push(
        new CopyPlugin( { 
            patterns: [
                { 
                    from: 'node_modules/wasm/app.wasm',
                    to:'static/js/app.wasm'
                }]
        })
    );

    return config;
};

