/* config-overrides.js */
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path')

module.exports = function override(config, env) {
    const wasmExtensionRegExp = /\.wasm$/;

    /*config.module.rules.push({
        test: wasmExtensionRegExp,
        include: path.resolve(__dirname, "wasm/"),
        type: "javascript/auto",
        use: [{loader: require.resolve('file-loader'), options: {
            outputPath: 'media',
        }}]
    });*/
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

