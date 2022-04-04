const { environment } = require('@rails/webpacker')
const babelLoader = environment.loaders.get('babel');

babelLoader.test = /\.(js|jsx|ts|tsx|mjs)?(\.erb)?$/;

module.exports = environment
