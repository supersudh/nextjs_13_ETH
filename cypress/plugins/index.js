const webpack = require('@cypress/webpack-preprocessor');
module.exports = on => {
  const options = {
    watchOptions: {}
  }

  on('file:preprocessor', webpack(options))
}