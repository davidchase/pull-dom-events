const buble = require('rollup-plugin-buble');


module.exports = {
    entry: './index.js',
    moduleName: 'pullDomEvents',
    plugins: [
        buble()
    ]
};
